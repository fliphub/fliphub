const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')

module.exports = class BundlerConfig extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
  }
  merge(config) {
    const data = Object.assign({}, {}, config)
    delete data.name
    delete data.unified
    delete data.flips
    delete data.config
    delete data.presets
    delete data.root
    super.merge(data)
    return this
  }
  toConfig() {
    let config = this.entries()
    return config
  }
}
