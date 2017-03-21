const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')

module.exports = class BundlerConfig extends ChainedMapExtendable {
  constructor(parent = Object) {
    super(parent)
  }
  merge(config = Object) {
    const data = this.derefAndClean(config)
    super.merge(data)
    return this
  }

  derefAndClean(config = Object) {
    const data = Object.assign({}, {}, config)
    delete data.name
    delete data.unified
    delete data.flips
    delete data.config
    delete data.presets
    delete data.root
    delete data.presetArgs
    return data
  }

  toConfig() {
    let config = this.entries()
    return config
  }
}
