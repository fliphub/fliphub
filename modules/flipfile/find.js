const {resolve, join} = require('path')
const exists = require('./exists')
const fileAndDir = require('./getFileAndPath')

class Finder {
  static from(file, dir) {
    const finder = new Finder(file, dir)
    return finder.find()
  }

  constructor(file, dir) {
    this.opts = {file, dir}
    this.found = {}
  }

  find() {
    this.withFileAndDir()
    this.withFile()
    this.fallback()
    return this.found
  }

  update({dir, file, abs}) {
    // ignore if we already found
    if (this.found.abs) return

    // ignore if it is not found
    if (!exists(abs)) return

    // otherwise set it
    this.found = {dir, file, abs}
  }

  // take file and dir options
  withFileAndDir() {
    let {dir, file} = this.opts
    if (!dir || !file) return

    if (!file.includes('ts') && !file.includes('js')) file += '.js'
    const abs = resolve(dir, file)
    this.update({dir, file, abs})
  }

  // extract dir and file name from file
  withFile() {
    const {dir, file} = fileAndDir(this.opts.file)
    if (!dir) return

    const abs = resolve(dir, file)
    this.update({dir, file, abs})
  }

  // fallback to just file and cwd
  fallback() {
    const joined = join(process.cwd(), this.opts.file)
    const {dir, file} = fileAndDir(joined)
    const abs = resolve(dir, file)
    this.update({abs, dir, file})
  }
}

module.exports = function find(config, directory) {
  // console.log('finding config...')
  const results = Finder.from(config, directory)
  // console.log(results)
  return results
}

module.exports.Finder = Finder
