const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')

module.exports = class Presets extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.list = new ChainedMapExtendable(this)
    this.used = new ChainedMapExtendable(this)
  }

  // --- single ---

  use(name, args) {
    this.used.set(name, args)
    return this
  }
  add(name, preset) {
    if (!preset) {
      preset = name
      name = preset.name
    }
    this.list.set(name, preset)
    return this
  }

  // --- multi for the single ^ ---

  // {name: args}
  useAll(presets) {
    for (const name in presets) this.use(name, presets[name])
    return this
  }
  // {name: preset}
  addAll(presets) {
    for (const name in presets) this.add(name, presets[name])
    return this
  }

  // so we'd likely need to deref here so we can do per app
  toConfig() {
    return {
      used: this.used.entries(),
      list: this.list.entries(),
    }
  }
}
