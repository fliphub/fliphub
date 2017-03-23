module.exports = class {
  constructor(parent) {
    this.parent = parent || this
    if (this.init) this.init(this.parent)
  }

  end() {
    return this.parent
  }
}
