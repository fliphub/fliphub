const globfs = require('glob-fs')()
// const files = globfs.use(ignore).readdirSync('./src/**', {})
// console.log(files)
// @TODO: make this work for all pkgs

const copy = require('copy')
const trash = require('trash')
const path = require('path')
const absSrc = path.resolve(__dirname, 'src')

class PkgExposer {
  delFilter(file) {
    if (file.path === absSrc) file.exclude = true
    if (file.path.includes('package.json')) file.exclude = true
    if (file.path.includes('pkgxp.js')) file.exclude = true
    if (file.path.includes('fliphub-helpers/src/')) file.exclude = true
    return file
  }
  copyFilter(file) {
    if (file.path === absSrc) file.exclude = true
    if (file.path.includes('package.json')) file.exclude = true
    if (file.path.includes('pkgxp.js')) file.exclude = true
    return file
  }
  del() {
    const ignore = this.delFilter
    const copiedStuff = globfs.use(ignore).readdirSync('*', {})
    trash(copiedStuff).then(() => {console.log('done')})
    console.log(copiedStuff)
  }
  copy(copyFrom = '**/**', copyFromFile = 'src/*.js') {
    const ignore = this.copyFilter
    const src = globfs.use(ignore).readdirSync('src/*', {})
    const folders = globfs.use(ignore).readdirSync('**/**', {})
    const jsFiles = globfs.use(ignore).readdirSync('*.js', {})
    const copyFromFiles = globfs.use(ignore).readdirSync(copyFrom, {})
    console.log(copyFromFiles)
    copy(copyFrom, './', {}, function(err, files) {
      if (err) return console.error(err)
      files.forEach(function(file) {
        console.log(file.relative)
      })
    })
  }
}

const pkgExp = new PkgExposer()
const argv = require('minimist')(process.argv.slice(2))
// console.log(argv)

if (argv.copy)
  pkgExp.copy()
else if (argv.del)
  pkgExp.del()
