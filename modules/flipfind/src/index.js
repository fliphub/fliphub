const {resolve, join, extname} = require('path')
const {exists, isAbs, isRel, fileAndDir} = require('flipfile')
const appRootPath = require('app-root-path').path
const monoRoot = require('mono-root')
const flipResolve = require('fliphub-resolve')
const log = require('fliplog')
const doesInclude = require('does-include')

const exts = ['js', 'ts', 'jsx', 'tsx', 'sql']

// @TODO:
// - [ ] auto-resolve folders too
// - [ ] cache this
// - [ ] do not just look for file, include the dir as well...
// - [ ] if dir is not null, we will use that as main attept root
// - [ ] add debug data to the result obj
//
// https://www.npmjs.com/package/is-path-in-cwd
// https://www.npmjs.com/package/locate-path
// https://www.npmjs.com/package/resolve-from
// https://www.npmjs.com/package/app-module-path
// https://www.npmjs.com/package/node-modules-path
class Finder {
  static from(file, dir) {
    const instance = new Finder(file, dir)
    return instance.find()
  }
  static file(file) {
    return new Finder(file)
  }

  debug() {
    this.opts.debug = true
    log
      .space(1)
      .data(this.opts)
      .text('options')
      .echo()
    return this
  }

  all() {
    this.opts.all = true
    return this
  }

  dir(dir) {
    this.opts.dir = dir
    return this
  }

  asObj() {
    this.opts.asObj = true
    return this
  }

  constructor(file, dir = null) {
    // user options
    this.opts = {file, dir, rel: file}

    // for full results
    this.findings = []

    // core result, @see this.asObj
    this.found = {
      abs: null,
      file: null,
      name: null,
      ext: null,
      dir: null,
    }

    // debug mode, silences logger if false
    this.opts.debug = false
  }

  find() {
    if (this.found.abs === null || this.opts.all === true)
      this.withFileAndDir()

    if (this.found.abs === null || this.opts.all === true)
      this.withFile()

    if (this.found.abs === null || this.opts.all === true)
      this.cwdFallback()

    if (this.found.abs === null || this.opts.all === true)
      this.mainFallback()

    if (this.found.abs === null || this.opts.all === true)
      this.appRootPathFallback()

    if (this.found.abs === null || this.opts.all === true)
      this.globFallback()

    if (this.found.abs === null || this.opts.all === true)
      this.monoFallback()

    if (this.opts.asObj) return this.found
    return this.found.abs
  }

  // https://www.npmjs.com/package/upath
  update({dir, file, abs, name, ext}) {
    // ignore if we already found
    if (this.found.abs) return

    if (extname(abs) === '') {
      for (let i = 0; i < exts.length; i++) {
        const extdot = '.' + exts[i]
        if (exists(abs + extdot)) {
          abs = abs + extdot
          break
        }
      }
    }

    log
      .bold('updating...')
      .data({exists: exists(abs), abs})
      .space(1)
      .echo(this.opts.debug)

    // ignore if it is not found
    if (!exists(abs)) return

    // otherwise set it
    this.found = {dir, file, abs, name, ext}
  }

  // take file and dir options
  withFileAndDir() {
    let {dir, file} = this.opts
    if (!dir || !file) return

    if (!file.includes('ts') && !file.includes('js')) file += '.js'
    const abs = resolve(dir, file)

    log
      .space(1)
      .cyan('withFileAndDir...')
      .data({abs, dir, file})
      .echo(this.opts.debug)

    this.update({dir, file, abs})
  }

  // extract dir and file name from file
  withFile() {
    const {dir, file} = fileAndDir(this.opts.file)
    if (!dir) return

    const abs = resolve(dir, file)

    log
      .space(1)
      .cyan('withFile...')
      .data({abs, dir, file})
      .echo(this.opts.debug)

    this.update({dir, file, abs})
  }

  // fallback to just file and cwd
  cwdFallback() {
    const cwd = process.cwd()
    const joined = join(cwd, this.opts.file)
    const {dir, file} = fileAndDir(joined)
    const abs = resolve(dir, file)
    log
      .space(1)
      .green('cwd...')
      .data({abs, dir, file, joined, cwd})
      .echo(this.opts.debug)

    this.update({abs, dir, file})
  }

  // fallback to main
  mainFallback() {
    const requireMain = require.main
    if (!requireMain) return this.npmFallback()
    const main = fileAndDir(require.main.filename)
    const mainFile = main.file
    const mainDir = main.dir

    const joined = join(mainDir, this.opts.file)
    const {dir, file} = fileAndDir(joined)
    const abs = resolve(dir, file)

    log
      .space(1)
      .green('main...')
      .data({abs, dir, file, joined, mainFile, mainDir})
      .echo(this.opts.debug)

    this.update({abs, dir, file})
    return this
  }

  // used if there is no require main
  // then we have access to global env npm
  npmFallback() {
    const env = process.env
    const main = env.npm_package_main
    const home = env.HOME

    log
      .space(1)
      .text('npm')
      .data({main, home})
      .echo(this.opts.debug)
  }

  appRootPathFallback() {
    const joined = join(appRootPath, this.opts.file)
    const {dir, file} = fileAndDir(joined)
    const abs = resolve(dir, file)

    log
      .space(1)
      .text('approot')
      .data({abs, dir, file, joined})
      .echo(this.opts.debug)

    this.update({abs, dir, file})
  }

  globFallback() {
    // make a rel path into globbable
    let rel = this.opts.rel
    if (rel.includes('./')) rel = rel.replace('./', '')

    const glob = `**/${rel}*`
    const globfs = require('glob-fs')()
    let globs = []

    function globToAbs(file) {
      globs.push({
        dir: file.dirname,
        file: file.segment,
        abs: file.path,
        name: file.name,
        ext: file.extname,
      })
      return file
    }

    try {
      const files = globfs.use(globToAbs).readdirSync(glob)

      globs = globs.filter(file => doesInclude(file.abs, files))

      log
        .text('glob')
        .data({files, glob, globs})
        .echo(this.opts.debug)

      if (globs.length === 1) {
        this.update(globs.shift())
      }
      else if (this.opts.dir) {
        globs = globs.filter(file =>
          exists(file.abs) && doesInclude(file.abs, this.opts.dir))
        this.update(globs.shift())
      }
      // because 0 means we did not find it
      else if (globs.length > 0) {
        globs = globs.filter(file => exists(file.abs))
        this.update(globs.shift())
      }
    } catch (error) {
      log
        .data({error})
        .echo(this.opts.debug)
    }
  }

  monoFallback() {
    let rel = this.opts.rel
    const abs = flipResolve(rel)
    if (abs) this.update({abs})

    log
      .space(1)
      .xterm(192)
      .text('monoFallback')
      .data({abs, exists: exists(abs)})
      .echo(this.opts.debug)
  }

}

function finder(file, directory) {
  const results = Finder.from(file, directory)
  return results
}


module.exports = finder
module.exports.Finder = Finder
module.exports.find = finder
