const {lstatSync} = require('fs')
const {resolve} = require('path')
const {read, write, exists, del} = require('flipfile')
const JSONChain = require('json-chain')
const ConfigStore = require('configstore')
const flipfind = require('flipfind')
const sleepfor = require('sleepfor')

// try to run a bin
//   - if it fails, use node
//   - store that it failed so we know when we try again
//
// @TODO:
//  - [ ] support buffers, if needed
//
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

    this.stats = false
  }

  /**
   * @TODO:
   * - [ ] chain conditionals
   * - [ ] set up some safety mode with mocking functionality
   * - [ ] this should be as a middleware, .use(info), .use(datefns)
   *
   * @return {Date}
   */
  lastModified() {
    if (this.stats === false) this.stats = lstatSync(this.absPath)
    return this.stats.mtime
  }

  /**
   * @see File.absPath
   * @return {lstatSync}
   */
  info() {
    if (this.stats === false) this.stats = lstatSync(this.absPath)
    return this.stats
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
    this.parse()
    return this
  }

  // http://stackoverflow.com/questions/34968763/is-there-any-risk-to-read-write-the-same-file-content-from-different-sessions
  safeReadWrite() {
    while (this.isWriting()) {
      console.log('------ISWRITING----')
      sleepfor(12)
    }
  }

  write(contents = null) {
    this.contents = contents || this.contents
    const str = this.toString()

    this.safeReadWrite()

    // to ensure multiple parallel processes do not read/write at the same time
    write(this.absPath + '-writing', '')
    write(this.absPath, str)

    if (contents !== null) this.parse()
    this.lastWritten = Date.now()

    del(this.absPath + '-writing')

    return this
  }

  // is read, but chainable, and only loads if it has not been loaded
  load(force = false) {
    this.read(force)
    return this
  }
  exists() {
    return exists(this.absPath)
  }
  isWriting() {
    return exists(this.absPath + '-writing')
  }
  read(force = false) {
    if (!this.exists()) this.create()
    if (this.isLoaded === true && force === false) return this.contents

    if (this.isJSON) {
      this.safeReadWrite()
      this.contents = read(this.absPath)
      this.parse()
      this.get = (key) => this.contents.get(key)
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
    if (this.isJSON !== true) return this
    this.contents = new JSONChain(this.contents)
    return this
  }

  // if we have no file
  create() {
    this.contents = '{}'
    write(this.absPath, this.contents)
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
    if (this.isJSON) return this.contents.toJSON()
    if (typeof this.contents === 'string') return this.contents
    if (this.contents && this.contents.toString) return this.contents.toString()
    return this.contents
  }
}
