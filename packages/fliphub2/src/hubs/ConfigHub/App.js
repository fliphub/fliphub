const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const Presets = require('./Presets')
const log = require('fliplog')

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
      'presets',
      'presetArgs',
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

  handlePresetArgs() {
    const args = this.get('presetArgs')

    // log
    //   .tags('presets,args')
    //   .preset('important')
    //   .addText('handling preset args...')
    //   .data({args})
    //   .echo()

    if (!args) return
    for (const name in args) {
      const arg = args[name]
      this.presets.use(name, arg)
    }
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

    this.handlePresetArgs()

    return this
  }
}
