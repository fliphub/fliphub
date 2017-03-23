// @TODO: make this work for all pkgs

// const copy = require('copy')
const fs = require('fs')
const path = require('path')
const globfs = require('glob-fs')()
const trash = require('trash')
const absSrc = path.resolve(__dirname, 'src')

// https://github.com/akre54/glob-copy/blob/master/index.js
function copyDir(srcDir, dstDir) {
  let results = []
  let list = fs.readdirSync(srcDir)
  let src
  let dst

  list = list.filter((file) => {
    // console.log(file === absSrc)
    // console.log(/node_modules/.test(file))
    // console.log(file.includes('package.json'))
    // console.log(file.includes('package.json'))
    // console.log(file.includes('pkgxp.js'))
    // console.log(file.includes('.DS_Store'))
    if (file === absSrc) return false
    if (/node_modules/.test(file)) return false
    if (file.includes('package.json')) return false
    if (file.includes('pkgxp.js')) return false
    if (file.includes('.DS_Store')) return false
    return file
  })
  .forEach((file) => {
    console.log(file)
    src = `${srcDir}/${file}`
    dst = `${dstDir}/${file}`
    // console.log(src)
    // return
		// console.log(src);
    const stat = fs.statSync(src)
    if (stat && stat.isDirectory()) {
      try {
        console.log(`creating dir: ${dst}`)
        fs.mkdirSync(dst)
      } catch (e) {
        console.log(`directory already exists: ${dst}`)
      }
      results = results.concat(copyDir(src, dst))
    } else {
      try {
        if (fs.existsSync(dst)) {
          console.log(dst, 'already existed')
          return
        }
        console.log(`copying file: ${dst}`)
        // fs.createReadStream(src).pipe(fs.createWriteStream(dst));
        fs.writeFileSync(dst, fs.readFileSync(src))
      } catch (e) {
        // console.log('could\'t copy file: ' + dst)
      }
      results.push(src)
    }
  })
  return results
}

function copy(files, destFolder) {
  for (const i in files) {
    try {
      const filename = files[i]
      copyDir(filename, destFolder)
      // const out = fs.createWriteStream(path.join(destFolder, path.basename(filename)))
      // fs.createReadStream(filename).pipe(out)
    } catch (e) {
      console.log(e)
    }
  }
}

class PkgExposer {
  delFilter(file) {
    if (file.path === absSrc) file.exclude = true
    if (/node_modules/.test(file.path)) file.exclude = true
    if (file.path.includes('package.json')) file.exclude = true
    if (file.path.includes('pkgxp.js')) file.exclude = true
    if (file.path.includes('fliphub-helpers/src/')) file.exclude = true
    return file
  }
  copyFilter(file) {
    if (file.path === absSrc) file.exclude = true
    if (/node_modules/.test(file.path)) file.exclude = true
    if (file.path.includes('package.json')) file.exclude = true
    if (file.path.includes('pkgxp.js')) file.exclude = true
    return file
  }
  del() {
    const ignore = this.delFilter
    const copiedStuff = globfs.use(ignore).readdirSync('*', {})
    console.log(copiedStuff)
    trash(copiedStuff).then(() => { console.log('done') })
  }
  copy(copyFrom = '**/** !node_modules', copyFromFile = 'src/*.js') {
    const ignore = this.copyFilter
    const src = globfs.use(ignore).readdirSync('src/*', {})
    const folders = globfs.use(ignore).readdirSync('**/**', {})
    const jsFiles = globfs.use(ignore).readdirSync('*.js', {})
    const copyFromFiles = globfs.use(ignore).readdirSync(copyFrom, {})
    // console.log(copyFromFiles)
    // copy(copyFromFiles, './')
    copyDir('./src', './')
  }
}

const pkgExp = new PkgExposer()
const argv = require('minimist')(process.argv.slice(2))

if (argv.copy) pkgExp.copy()
else if (argv.del) pkgExp.del()
