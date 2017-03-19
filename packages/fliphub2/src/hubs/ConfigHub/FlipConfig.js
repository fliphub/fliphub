// ops
//
// flip presets
// -> flip chains
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const Presets = require('./Presets')
const is = require('izz')
const arrToObj = require('arr-to-obj')

module.exports = class FlipConfig extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.presets = new Presets(this)
    this.extend(['inherit', 'from', 'to'])
  }
  merge(config) {
    // whether all apps should inherit by default
    // flipping from-to
    let {presets, inherit, from, to} = config
    const merge = {inherit, from, to}
    Object
    .keys(merge)
    .filter(key => is.real(merge[key]))
    .forEach(key => {
      const val = merge[key]
      switch (key) {
        default: return this[key](val)
      }
    })

    if (presets) {
      presets = arrToObj.valAsKey(presets)
      for (const preset in presets)
        if (preset)
          this.presets.use(preset, presets[preset] === preset ? undefined : presets[preset])
    }
    delete config.presets
    return this
  }
}
