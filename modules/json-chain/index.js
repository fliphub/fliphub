const dotProp = require('dot-prop')

module.exports = class JSONChain {
  constructor(data) {
    this.data = data
    this.parse()

    this.set = this.update.bind(this)
    this.get = this.val.bind(this)
    this.delete = this.del.bind(this)
    this.remove = this.del.bind(this)
    this.current = null
  }

  static init(data) {
    return new JSONChain(data)
  }

  // "deepmerge": "*"
  // const merge = require('deepmerge')
  // merge(data) { }

  // add or update
  update(key, val) {
    this.parse()
    if (key.includes('.')) dotProp.set(this.data, key, val)
    else this.data[key] = val
    this.current = val
    return this
  }
  has(key) {
    this.parse()
    if (key.includes('.')) return dotProp.has(this.data, key)
    return Object.prototype.hasOwnProperty.call(this.data, key)
  }
  // delete. remove
  del(key) {
    this.parse()
    if (key.includes('.')) dotProp.delete(this.data, key)
    else delete this.data[key]
    return this
  }
  // return value - current key or named
  val(key = null) {
    this.parse()
    if (key === null) return this.current
    if (key.includes('.')) return dotProp.get(this.data, key)
    return this.data[key]
  }
  parse() {
    if (typeof this.data !== 'string') return this

    try {
      const data = JSON.parse(this.data)
      this.data = data
    } catch (e) {
      console.log(e)
    }

    return this
  }

  toString() {
    return this.toJSON()
  }
  toJSON() {
    return JSON.stringify(this.data, null, '  ')
  }
}
