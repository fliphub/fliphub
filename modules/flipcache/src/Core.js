const detachedParent = require('./detached/parent')
const Files = require('./Files')

let singleton

// @core
class FlipCache {
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

  add(name) {
    const files = new Files(this)
    this._files[name] = files
    return files
  }

  file(name) {
    return this._files[name]
  }

  autoFactory({from, to, timeout, type}) {
    if (!this.catcher) {
      this.catcher = true
      // and on sigterm etc
      // process.on('UncaughtException', e => {})
      detachedParent({from, to, timeout, type, PATH: process.env.PATH})
    }
  }

  // @TODO: ---
  // - [ ] Files would call .parent?
  //
  // need to
  // 1. be able to cancel the autoRemove & autoRestore
  // 2. be able to reset the timeout on autoSave when we update
  // 3. be able to update the contents on autoSave when we update
  //
  // seems difficult when it is detached...
  // autoRestore() {
  //   return this
  // }
  // autoRemove() {
  //   detachedParent({env: 'here'})
  //   return this
  // }
  // autoSave() {
  //   detachedParent({env: 'here'})
  //   return this
  // }

  /**
   * autoDelete
   * autoRestore
   * autoSave
   *
   * explicitSave explicitDelete explicitRestore?
   * may need a listener to the file?
   */

  // --- @ops ---
  restore(name) { return this._files[name].restore() }
  read(name, json = false) { return this._files[name].read() }
  write(name, contents, json = false) { return this._files[name].write() }
}

module.exports = FlipCache
