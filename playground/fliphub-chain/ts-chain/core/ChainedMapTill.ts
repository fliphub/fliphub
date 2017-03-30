import ChainedMapExtendable from './ChainedMapExtendable'

class ChainedMapTill extends ChainedMapExtendable {
  public _keys: Array<string>
  public keysToUse: number
  public keysCalled: number

  constructor(parent: any, keys: Array<string>) {
    super(parent)
    this.setupKeys(keys)
  }

  // @TODO: `or`
  static from(parent: any, keys: Array<string>, obj: Object) {
    return new ChainedMapTill(parent, keys).use(obj)
  }

  // used to bypass keys if you just pass in everything as obj
  public use(obj: Object) {
    if (obj) {
      for (const key in obj) {
        this.set(key, obj[key])
      }
      return this.parent
    }
    return this
  }

  public setupKeys(keys: Array<string>) {
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
