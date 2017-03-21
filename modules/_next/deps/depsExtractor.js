const read = require('../file/read')
const timer = require('../timer')

function makeReqStr(matches) {
  var str = ``
  + (`(?:\\s*require\\(['|"]*)`)
  // + esc(`(?:\s+require\([\'|\"])(`)
  + `(${matches})`
  // + esc(`)(?:[\'|\"]\);?))`)
  + (`(?:['|"]\\)?)`)
  return str
}

function makeImpStr(matches) {
  var impStr = ``
  + (`(?:import[a-z0-1A-Z\\s]*from\\s*['|"])`)
  + `(${matches})`
  + (`(?:['|"];?)`)
  return impStr
}

const reqStr = makeReqStr('(.*?)')
const impStr = makeImpStr('(.*?)') // ([a-zA-Z0-9-_]*)
const reqReg = new RegExp(reqStr, 'gm')
const impReg = new RegExp(impStr, 'gm')
const reqRegSingle = new RegExp(reqStr)
const impRegSingle = new RegExp(impStr)
const impRegIncImpFrom = /(import[a-z0-9A-Z]*)(?:from)/gmi
const impRegIncFrom = /(?:from)[./]/gmi

// or just filter by if they use alias
// const matcher = new RegExp(reqStr + impStr, 'gm')
// const getDirectories = require('./packages/fliphub-helpers/src/file/getDirectories')
// const node_modules = getDirectories('./node_modules')

class DepsExtractor {
  constructor() {
    timer.start('deps extract')
    this.deps = []
    this.uniqDeps = []
    // this.dir = dir
    // this.paths = []
    // this.files = []
    // this.log
  }

  usingGlob(glob, excludes = [/node_modules/]) {
    timer.start('glob')
    let globfs = require('glob-fs')()
    function ignore(file) {
      for (let i in excludes)
        if (excludes[i].test(file.path)) file.exclude = true
      return file
    }
    const extract = file => {
      timer.start('extract')
      const {absolute, exclude, isFile} = file
      if (!exclude && isFile()) this.extract(read(absolute))
      return file
    }

    const files = globfs.use(ignore).use(extract).readdirSync(glob, {})
    timer
    .stop('glob')
    .stop('extract')
    .log('glob')
    .log('extract')
    .logLaps('extract')
    console.log('files.length: ' + files.length)
    console.log('deps.length: ' + this.deps.length)
    // console.log('extract laps: ', timer.laps['extract'])
  }

  // http://gulpjs.org/recipes/rollup-with-rollup-stream.html
  gulp() {
    const through = require('through2')
    return through.obj((file, encodng, callback) =>
      callback(null, this.extract(file._contents.toString())))
  }

  onlyInternal() {
    const isRel = require('../file/isRel')
    return this.deps.filter(isRel)
  }
  onlyExternal() {
    return this.deps.filter(dep => !dep.includes('./'))
  }

  extract(str) {
    // don't even match files with no require or import
    if (!str.includes('require') && !str.includes('import')) return false
    const imports = str.match(impReg)
    const requires = str.match(reqReg)
    if (imports) {
      for (let p in imports) {
        const imp = imports[p]
          .match(impRegSingle)[1]
          .replace(/['"\\]/gmi, '')
          .replace(/(\n| )/gmi, '')
        this.deps.push(imp)
        if (!this.uniqDeps.includes(imp)) this.uniqDeps.push(imp)
      }
    }
    if (requires) {
      for (let r in requires) {
        const req = requires[r]
          .match(reqRegSingle)[0]
          .replace('require(', '')
          .replace(')', '')
          .replace(/['"\\]/gmi, '')
          .replace(/(\n| )/gmi, '')
        this.deps.push(req)
        if (!this.uniqDeps.includes(req)) this.uniqDeps.push(req)
      }
    }

    timer.lap('extract')
  }
}

module.exports = DepsExtractor
