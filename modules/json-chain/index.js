module.exports = class JSONChain {
  constructor(data) {
    this.data = data
    this.parse()

    this.current = null
  }
  // add or update
  update(key, val) {
    this.parse()
    this.data[key] = val
    this.current = val
    return this
  }
  has(key) {
    this.parse()
    return Object.prototype.hasOwnProperty.call(this.data, key)
  }
  // delete. remove
  del(key) {
    this.parse()
    delete this.data[key]
    return this
  }
  // return value - current key or named
  val(key = null) {
    this.parse()
    if (key === null) return this.current
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
