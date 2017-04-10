const detachedParent = require('./detached/parent')
const Files = require('./Files')

let singleton

// @core
class FlipCache {

  // --- 🏭 ---

  static init(files = []) {
    if (!singleton) singleton = new FlipCache(files)
    return singleton
  }
  static to(name) {
    return FlipCache.init().add(name).to(name)
  }
  static from(name) {
    return FlipCache.init().add(name).from(name)
  }
  static file(name) {
    return FlipCache.init().file(name)
  }

  constructor(files = []) {
    this._files = files
  }

  autoFactory(args) {
    if (!this.catcher) {
      this.catcher = true
      args.PATH = process.env.PATH

      // and on sigterm etc
      // process.on('UncaughtException', e => {})
      detachedParent(args)
    }
  }

  // -- ⛓ ---

  add(name) {
    const files = new Files(this)
    this._files[name] = files
    return files
  }

  file(name) {
    return this._files[name]
  }

  // --- @ops ---

  restore(name) { return this._files[name].restore() }
  read(name, json = false) { return this._files[name].read() }
  write(name, contents, json = false) { return this._files[name].write() }
}

module.exports = FlipCache
