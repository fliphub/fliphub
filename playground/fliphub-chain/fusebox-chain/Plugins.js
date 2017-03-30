const ChainedMap = require('./ChainedMap')
const ChainedMapExtendable = require('./ChainedMapExtendable')
const Plugin = require('./Plugin')

module.exports = class Plugins extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.inittable = new ChainedMap(this)
    // this.plugins = new ChainedMap(this)
  }
  plugin(name) {
    if (!this.has(name)) {
      this.set(name, new Plugin(this))
    }

    return this.get(name)
  }
}
