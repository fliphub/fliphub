const Chainable = require('./Chainable')

module.exports = class extends Chainable {
  constructor(parent) {
    super(parent)
    this.options = new Map()
    this.shorthands = []
  }
  // @NOTE:
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
    methods.map(method => {
      this[method] = value => this.set(method, value)
    })
  }

  clear() {
    this.options.clear()
    return this
  }

  delete(key) {
    this.options.delete(key)
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

  values() {
    return [...this.options.values()]
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
    Object.keys(obj).forEach(key => {
      this.set(key, obj[key])
      // const eh = this.get(key)
      // console.verbose(, obj[key])
    })
    return this
  }

  clean(obj) {
    return Object
      .keys(obj)
      .reduce((acc, key) => {
        const value = obj[key]

        if (value === undefined) {
          return acc
        }

        if (Array.isArray(value) && !value.length) {
          return acc
        }

        if (Object.prototype.toString.call(value) === '[object Object]' && !Object.keys(value).length) {
          return acc
        }

        acc[key] = value

        return acc
      }, {})
  }
}
