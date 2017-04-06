const deepmerge = require('deepmerge')
const Chainable = require('./Chainable')

class ChainedMap extends Chainable {
  constructor(parent) {
    super(parent)
    this.shorthands = []
    this.chainableMethods = []
    this.store = new Map()

    if (!this.name) this.name = this.constructor.name
    this.className = this.constructor.name
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

  /**
   * checks each property of the object
   * calls the chains accordingly
   *
   * @param {Object} obj
   * @return {Chainable}
   */
  from(obj) {
    Object.keys(obj).forEach((key) => {
      const fn = this[key]
      const value = obj[key]

      if (this[key] && this[key] instanceof Chainable) {
        return this[key].merge(value)
      }
      else if (typeof this[key] === 'function') {
        // const fnStr = typeof fn === 'function' ? fn.toString() : ''
        // if (fnStr.includes('return this') || fnStr.includes('=> this')) {
        return this[key](value)
      }
      else {
        this.set(key, value)
      }
    })
    return this
  }

  // remove...
  fromAnd(obj) {
    let p = this.merge(obj).parent
    while (p.parent) {
      p = p.parent
    }
    return p
  }

  extend(methods) {
    this.shorthands = methods
    methods.forEach((method) => {
      this[method] = (value) => this.set(method, value)
    })
    return this
  }

  clear() {
    this.store.clear()
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Chainable) this[key].clear()
      if (this[key] instanceof Map) this[key].clear()
    })
    return this
  }

  delete(key) {
    this.store.delete(key)
    return this
  }

  entries() {
    const entries = [...this.store]
    if (!entries.length) {
      return null
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
  concat(key, value) {
    if (!Array.isArray(value)) value = [value]
    this.store.set(key, this.store.get(value).concat(value))
    return this
  }
  append(key, value) {
    this.store.set(key, this.store.get(value) + value)
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

  // @TODO: abstract
  mergeReal(obj) {
    Object
    .keys(obj)
    .filter(key => obj[key])
    .forEach((key) => {
      const value = obj[key]
      if (!value) return this

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

  merge(obj) {
    if (obj.toConfig) {
      const msg = 'when merging two chains, first call .toConfig'
      const validation = new Error(msg)

      let log
      try {
        log = require('fliplog')
          .verbose(2)
          .data(validation)
          .preset('error')
      } catch (e) {
        log = console
      }
      log.log(validation)
      throw validation
      return this
    }
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

  when(condition, trueBrancher = Function.prototype, falseBrancher = Function.prototype) {
    if (condition) {
      trueBrancher(this)
    } else {
      falseBrancher(this)
    }

    return this
  }
}

module.exports = ChainedMap
