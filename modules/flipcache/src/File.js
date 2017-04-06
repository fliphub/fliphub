const {resolve, dirname} = require('path')
const {read, write, exists, isAbs, del} = require('flipfile')
const JSONChain = require('json-chain')
const ConfigStore = require('configstore')
const flipfind = require('flipfind')

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

    this.opts = {path}
    this.absPath = flipfind(path) || path
    if (!path) this.store(path)

    this.contents = ''

    // is
    this.isLoaded = false
    this.isJSON = false

    // timestamps
    this.lastWritten = false
    this.lastRead = false

    // shorthands / alias
    this.prepend = this.prependContent.bind(this)
    this.append = this.appendContent.bind(this)
  }

  dir(dir) {
    this.absPath = resolve(dir, this.opts.path)
    return this
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
      this.setIfNotEmpty = (key, val) => {
        this.contents.setIfNotEmpty(key, val)
        return this
      }
      this.set = (key, val) => {
        this.contents.update(key, val)
        return this
      }
      this.update = this.set
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

  del() {
    del(this.absPath)
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
