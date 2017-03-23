const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')
const cleanObj = require('clean-obj')
const Presets = require('./Presets')

module.exports = class AppConfig extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.extend([
      'root',
      'name',
      'unified',
      'from',
      'to',
      'flips',
      'config',
      'inherit',
      'presetArgs',
      'debug',
    ])
    this.presets = new Presets(this)
  }

  // {name: args}
  usePresets(presets) {
    this.presets.useAll(presets)
    return this
  }
  // {name: preset}
  addPresets(presets) {
    this.presets.addAll(presets)
    return this
  }
  addPreset(name, preset) {
    this.presets.add(name, preset)
    return this
  }

  mergePresets(presets) {
    const presetArgs = this.get('presetArgs')

    // @NOTE: technically this should be parent when we instantiate
    // but we want to conditionally merge...
    //
    // merge in parent, unless client says not to
    if (this.get('inherit') !== false) {
      const presetConfig = this.parent.box.flipConfig.presets.toConfig()
      this.presets.merge(presetConfig)
    }

    Presets.mergeFor({presets, presetArgs, context: this})
    return this
  }
  mergePresetArgs() {
    const args = this.get('presetArgs')
    if (!args) return null

    for (const name in args) {
      const arg = args[name]
      this.presets.use(name, arg)
    }

    return this
  }

  merge(app) {
    const deref = Object.assign({}, {}, app)
    const {
      unified,
      flips,
      config,

      presets,
      presetArgs,

      name,
      inherit,
      root,
      debug,
    } = deref
    const data = {
      unified,
      flips,
      config,
      presetArgs,
      name,
      inherit,
      root,
      debug,
    }

    // removing empty properties
    cleanObj(data)

    super
      .merge(data)
    this
      .mergePresets(presets)
      .mergePresetArgs()

    // filtering logs per context
    if (debug) log.filter(debug)

    return this
  }
}
