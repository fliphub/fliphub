class Chainable {
  constructor(parent) {
    this.parent = parent
    if (this.init) this.init(parent)
  }
  end() {
    return this.parent
  }
}

module.exports = Chainable
