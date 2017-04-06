
// @TODO: make this work for all pkgs

// const copy = require('copy')
const {execSync} = require('child_process')
const {
  write,
  read,
  exists,
  isDir,
  glob,
  fs,
  resolve,
} = require('flipfile/all')
const flipcache = require('flipcache')
const trash = require('trash')
const argv = require('minimist')(process.argv.slice(2))
const log = require('fliplog')

const pkg = flipcache.from(resolve(__dirname, './.flip/package.json'))
const absSrc = resolve(__dirname, 'src')
const copyList = flipcache.to('./easy-npm-files.json').json()

function defaultFilter(file, dstDir) {
  if (file === absSrc) return false
  if (/node_modules/.test(file)) return false
  const dst = `${dstDir}/${file}`
  if (exists(dst)) return false
  if (file.includes('package.json')) return false
  if (file.includes('.DS_Store')) return false
  return file
}

let allResults = []
let dests = []
function copyDir(srcDir, dstDir, filter = defaultFilter) {
  let results = []
  let list = fs.readdirSync(srcDir)
  let src
  let dst

  list = list.filter((file) => filter(file, dstDir))
  .forEach((file) => {
    console.log(file)
    src = `${srcDir}/${file}`
    dst = `${dstDir}/${file}`
    dests.push(dst)
    allResults.push(src)
    console.log(src)

    if (isDir(src)) {
      try {
        console.log(`creating dir: ${dst}`)
        fs.mkdirSync(dst)
      } catch (e) {
        console.log(`directory already exists: ${dst}`)
      }
      results = results.concat(copyDir(src, dst))
      allResults = allResults.concat(results)
    } else {
      try {
        if (exists(dst)) {
          console.log(dst, 'already existed')
          return
        }
        console.log(`copying file: ${dst}`)
        // @NOTE: disabled
        // write(dst, read(src))
      } catch (e) {
        // console.log('could\'t copy file: ' + dst)
      }
      results.push(src)
      allResults.push(src)
    }
  })
  return results
}

class Copy {
  run(copyFrom = '**/** !node_modules', copyFromFile = 'src/*.js') {
    // merge all copies, unique them, clean them
    let copied = copyDir('./src', './').concat(allResults).concat(dests)
    copied = [...new Set(copied)].map(item => item.replace(/\/{2}/, '/'))

    copyList.setContent({copied}).parse().write()
    log.data(copyList.clean().contents.toJSON()).verbose(500).echo().exit()
  }
}

class Clean {
  filter(file) {
    const list = copyList
      .load()
      .val('copied')
      .map(item => resolve(__dirname, item
        .replace('./src/', '')
        .split('/')
        .shift()
      ))

    console.log(list)
    // file.exclude = true
    if (!list.includes(file.path)) file.exclude = true
    // if (file.path === absSrc) file.exclude = true
    // if (/node_modules/.test(file.path)) file.exclude = true
    // if (file.path.includes('package.json')) file.exclude = true
    // if (file.path.includes('pkgxp.js')) file.exclude = true
    // if (file.path.includes('fliphub-helpers/src/')) file.exclude = true
    return file
  }
  run() {
    const copiedStuff = glob.use(this.filter).readdirSync('*', {})
    console.log(copiedStuff)
    trash(copiedStuff).then(() => { console.log('done') })
  }
}

class PkgExposer {
  constructor() {
    this.Copy = new Copy()
    this.Clean = new Clean()
  }
  copy() {
    this.Copy.run()
  }
  clean() {
    this.Clean.run()
  }
}

const pkgExp = new PkgExposer()
if (argv.copy) {
  pkgExp.copy()
  const ignores = ['node_modules', 'TODO', 'package.json', '.gitignore', '']
  const ls = execSync('ls')
    .toString()
    .split('\n')
    .filter((l) => !ignores.includes(l))

  // pkg.files = ls
  // const pkgStr = JSON.stringify(pkg, null, '  ')
  // write('./package.json', pkgStr)
} else if (argv.del) {
  pkgExp.clean()
}
