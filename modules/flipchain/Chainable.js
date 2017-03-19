const {inspectorGadget} = require('inspector-gadget')

class Chainable {
  constructor(parent) {
    this.parent = parent
    this.inspect = inspectorGadget(this, ['parent'])
    if (this.init) this.init(parent)
  }
  end() {
    return this.parent
  }
}

module.exports = Chainable
