const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const Presets = require('./Presets')
const ConfigDefaulter = require('./ConfigDefaulter')

const is = require('izz')
const log = require('fliplog')

// this needs its own defaulter?
module.exports = class FlipConfig extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.presets = new Presets(this)
    this.extend(['inherit', 'from', 'to', 'defaults', 'presetArgs'])
    ConfigDefaulter.defaultPresets(this.presets)
  }

  merge(config) {
    // whether all apps should inherit by default
    // flipping from-to
    let {presets, inherit, from, to, defaults, presetArgs} = config
    const merge = {inherit, from, to, defaults, presetArgs}
    Object
    .keys(merge)
    .filter(key => is.real(merge[key]))
    .forEach(key => {
      const val = merge[key]
      switch (key) {
        default: {
          // log.tags('merge,flip,config').data({key, val}).echo()
          return this[key](val)
        }
      }
    })

    Presets.mergeFor({presets, presetArgs, context: this})
    return this
  }
}
