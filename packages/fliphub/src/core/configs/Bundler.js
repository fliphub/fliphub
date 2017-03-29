const {join} = require('path')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')

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
    delete data.defaults
    return data
  }

  entryToString() {
    let entry = this.get('entry')
    if (typeof entry === 'object') {
      // this.entry = this.entry
    }
  }

  outputToString() {
    let output = this.get('output')
    if (typeof output === 'object') {
      output = join(output.path, output.filename)
      this.merge({output})
    }
  }

  toConfig() {
    const config = this.entries()
    // console.log(config)
    return config
  }
}
