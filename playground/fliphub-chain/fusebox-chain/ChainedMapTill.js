const ChainedMapExtendable = require('./ChainedMapExtendable')

module.exports = class ChainedMapTill extends ChainedMapExtendable {
  constructor(parent, keys, or) {
    super(parent)
    this.setupKeys(keys)
  }

  static from(parent, keys, obj, or) {
    return new ChainedMapTill(parent, keys, or).use(obj)
  }

  // used to bypass keys if you just pass in everything as obj
  use(obj) {
    console.verbose(obj)

    if (obj) {
      for (const key in obj) {
        this.set(key, obj[key])
      }
      return this.parent
    }
    // console.log(this)
    return this
  }

  setupKeys(keys) {
    this._keys = keys
    this.keysToUse = keys.length
    this.keysCalled = 0
    this.extend(keys)
    keys.forEach(key => {
      if (this[key]) {
        const ref = this[key]
        this[key] = (...args) => {
          ++this.keysCalled
          const res = ref(...args)
          if (this.keysToUse === this.keysCalled) return this.parent
          return res
        }
      }
    })
  }

  // maybe another name
  and() {
    --this.keysCalled
    return this
  }
}
