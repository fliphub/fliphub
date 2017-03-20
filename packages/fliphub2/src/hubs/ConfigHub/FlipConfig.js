const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const Presets = require('./Presets')
const ConfigDefaulter = require('./ConfigDefaulter')

const is = require('izz')
const arrToObj = require('arr-to-obj')
const deepmerge = require('deepmerge')
const log = require('fliplog')

// this needs its own defaulter?
module.exports = class FlipConfig extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.presets = new Presets(this)
    this.extend(['inherit', 'from', 'to', 'defaults', 'presetArgs'])
    ConfigDefaulter.defaultPresets(this.presets)
  }

  handlePresets({config, presets, presetArgs}) {
    if (presets) {
      presets = arrToObj.valAsKey(presets)
      // log.diff(presets)
      if (presetArgs) presets = deepmerge(presets, presetArgs)
      // log.diff(presets)
      // log.doDiff()

      // log
      //   .tags('flipconfig,presets,args,setup')
      //   .data(presets)
      //   .verbose()
      //   .text('presets')
      //   .echo()

      for (const preset in presets) {
        if (!preset) continue
        this.presets.use(preset,
          presets[preset] === preset ? undefined : presets[preset])
      }
    }
    delete config.presets
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

    this.handlePresets({config, presets, presetArgs})

    return this
  }
}
