const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const Presets = require('./Presets')

module.exports = class AppConfig extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.extend([
      'name',
      'unified',
      'from',
      'to',
      'flips',
      'config',
      'presets',
      'root',
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

  merge(app) {
    const deref = Object.assign({}, {}, app)
    const {unified, flips, config, presets, name, inherit, root} = deref
    const data = {unified, flips, config, presets, name, inherit, root}

    // would be good as a lib: removeEmptyProps
    for (const prop in data) if (!data[prop] || !prop) delete data[prop]

    super.merge(data)

    if (this.get('inherit') !== false) {
      const presetConfig = this.parent.box.flipConfig.presets.toConfig()
      this.presets.merge(presetConfig)
    }

    return this
  }
}
