const Chainable = require('./Chainable')
const deepmerge = require('deepmerge')

class ChainedMap extends Chainable {
  constructor(parent) {
    super(parent)
    this.shorthands = []
    this.store = new Map()
  }

  new(parent) {
    return new this(parent || this)
  }

  and() {
    if (this.parent.parent) return this.parent.parent
    return this.parent
  }

  use(obj) {
    return this.merge(obj).parent
  }

  from(obj) {
    let p = this.merge(obj).parent
    while (p.parent) {
      p = p.parent
    }
    return p
  }

  extend(methods) {
    this.shorthands = methods
    methods.map((method) => {
      this[method] = (value) => this.set(method, value)
    })
  }

  clear() {
    this.store.clear()
    return this
  }

  delete(key) {
    this.store.delete(key)
    return this
  }

  entries() {
    const entries = [...this.store]
    if (!entries.length) {
      return
    }
    return entries.reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  values() {
    return [...this.store.values()]
  }
  get(key) {
    return this.store.get(key)
  }

  has(key) {
    return this.store.has(key)
  }

  set(key, value) {
    this.store.set(key, value)
    return this
  }

  override(obj) {
    Object
    .keys(obj)
    .forEach((key) => {
      const value = obj[key]
      if (this[key] && this[key] instanceof Chainable) {
        return this[key].override(value)
      }
      if (this.shorthands.includes(key)) {
        return this[key](value)
      }
      return this.set(key, value)
    })
    return this
  }

  merge(obj) {
    Object
    .keys(obj)
    .forEach((key) => {
      const value = obj[key]
      if (this[key] && this[key] instanceof Chainable)
        return this[key].merge(value)
      if (this.shorthands.includes(key)) {
        const existing = this.get(key)
        if (existing) {
          const merged = deepmerge(existing, value)
          return this[key](merged)
        }

        return this[key](value)
      }
      // if (this[key])
      return this.set(key, value)
    })
    return this
  }

  clean(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key]
      if (value === undefined) return acc
      if (Array.isArray(value) && !value.length) return acc
      if (Object.prototype.toString.call(value) === '[object Object]' && !Object.keys(value).length)
        return acc
      acc[key] = value
      return acc
    }, {})
  }
}

module.exports = ChainedMap
