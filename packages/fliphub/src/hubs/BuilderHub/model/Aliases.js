class Aliases {
  constructor() {
    this.data = {}
    this.keys = []
  }
  use() { return this.keys.length }
  // keys() { return this.keys }
  get() { return this.data }
  set(aliases) {
    this.data = aliases
    this.keys = Object.keys(aliases)
  }
}

module.exports = Aliases
