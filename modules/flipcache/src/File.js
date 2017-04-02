const {resolve, dirname} = require('path')
const {read, write, exists, isAbs} = require('flipfile')
const JSONChain = require('json-chain')
const ConfigStore = require('configstore')

function autoResolve(path) {
  if (!path) return path
  // if (!isAbs(path)) return path
  const cwd = resolve(process.cwd(), path)
  const main = resolve(dirname(require.main.filename), path)
  // const root = resolve(appRootPath, path)
  // console.log(cwd, main)

  if (exists(cwd)) return cwd
  if (exists(main)) return main
  return path
}

// try to run a bin
//   - if it fails, use node
//   - store that it failed so we know when we try again

// @NOTE:
// this would mean two files
// one original, one output,
// metadata links them
module.exports = class File {
  constructor(path, parent) {
    this.parent = parent
    // this.files = parent
    this.to = this.parent.to.bind(this.parent)
    this.from = this.parent.from.bind(this.parent)

    this.absPath = autoResolve(path)
    if (!path) this.store(path)

    this.contents = ''

    // is
    this.isLoaded = false
    this.isJSON = false

    // timestamps
    this.lastWritten = false
    this.lastRead = false
  }

  store(name) {
    if (this.config) return this.config
    this.config = new ConfigStore(name)
    return this.config
  }

  json(bool = true) {
    this.isJSON = bool
    return this
  }
  prependContent(content) {
    this.contents = content + this.contents
    return this
  }
  appendContent(content) {
    this.contents += content
    return this
  }
  setContent(contents) {
    this.contents = contents
    return this
  }

  write(contents) {
    this.contents = contents || this.contents
    const string = this.isJSON ? this.contents.toJSON() : this.contents
    write(this.absPath, string)
    this.lastWritten = Date.now()
    return this
  }

  // is read, but chainable
  load() {
    this.read()
    return this
  }
  exists() {
    return exists(this.absPath)
  }
  read() {
    if (!this.exists()) this.create()

    if (this.isLoaded) {
      return this.contents
    }
    if (this.isJSON) {
      this.contents = read(this.absPath)
      this.parse()
      this.has = (key) => this.contents.has(key)
      this.val = (val) => this.contents.val(val)
      this.update = (key, val) => {
        this.contents.update(key, val)
        return this
      }
    }
    else {
      this.contents = read(this.absPath)
    }

    this.isLoaded = true
    this.lastRead = Date.now()

    return this.contents
  }
  parse() {
    this.contents = new JSONChain(this.contents)
    return this
  }

  // if we have no file
  create() {
    write(this.absPath, '{}')
    return this
  }

  clean() {
    delete this.parent
    return this
  }
  end() {
    return this.parent
  }

  toString() {
    return this.contents
  }
}
