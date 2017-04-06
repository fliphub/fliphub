const detachedParent = require('./detached/parent')
const Files = require('./Files')

// @core
class FlipCache {
  static init(files = []) {
    return new FlipCache(files)
  }
  static to(name) {
    return new FlipCache().add(name).to(name)
  }
  static from(name) {
    return new FlipCache().add(name).from(name)
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

  // @TODO: ---
  //
  // need to
  // 1. be able to cancel the autoRemove & autoRestore
  // 2. be able to reset the timeout on autoSave when we update
  // 3. be able to update the contents on autoSave when we update
  //
  // seems difficult when it is detached...
  autoRestore() {
    detachedParent({env: 'here'})
    return this
  }
  autoRemove() {
    detachedParent({env: 'here'})
    return this
  }
  autoSave() {
    detachedParent({env: 'here'})
    return this
  }

  // --- @ops ---
  restore(name) { return this._files[name].restore() }
  read(name, json = false) { return this._files[name].read() }
  write(name, contents, json = false) { return this._files[name].write() }
}

module.exports = FlipCache
