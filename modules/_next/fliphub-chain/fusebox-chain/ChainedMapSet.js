const Chainable = require('./Chainable')

module.exports = class extends Chainable {
  constructor(parent) {
    super(parent)
    this.options = new Map()
    this.collection = new Set()
  }

  extend(methods) {
    this.shorthands = methods
    methods.map(method => {
      this[method] = value => this.set(method, value)
    })
  }

  clear() {
    this.options.clear()
    this.collection.clear()
    return this
  }

  delete(key) {
    this.options.delete(key)
    this.collection.delete(key)
    return this
  }

  entries() {
    const entries = [...this.options]

    if (!entries.length) {
      return
    }

    return entries.reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  get(key) {
    return this.options.get(key)
  }

  has(key) {
    return this.options.has(key)
  }

  set(key, value) {
    this.options.set(key, value)
    return this
  }

  merge(obj) {
    if (Array.isArray(obj)) {
      this.collection = new Set([...this.collection, ...obj])
    } else {
      Object.keys(obj).forEach(key => this.set(key, obj[key]))
    }
    return this
  }

  add(value) {
    this.collection.add(value)
    return this
  }

  prepend(value) {
    this.collection = new Set([value, ...this.collection])
    return this
  }

  clear() {
    this.collection.clear()
    return this
  }

  values() {
    return [...this.collection, ...this.options.values()]
  }
  setValues() {
    return [...this.collection]
  }
  mapValues() {
    return [...this.options.values()]
  }

  has(value) {
    return this.collection.has(value)
  }
}
