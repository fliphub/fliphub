const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const deepmerge = require('deepmerge')

module.exports = class Config extends ChainedMapExtendable {
  constructor(any) {
    super(any)
    this.chains = []

    this.extendBool([
      'debug',
    ], true)
    this.extend([
      'output',
      'sourceMap',
    ])
  }

  static init(preferences) {
    return new Config(preferences)
  }

  plugin(name, ...args) {
    this.plugins.plugin(name, ...args)
    return this
  }

  // @TODO:
  // require a namespace for published presets (akin to eslint)
  // such as `-preset-react`
  // try to require it here, if it cannot be required, decide the best route
  // 1. warn
  // 2. error
  // 3. install, restart with a subprocess
  presets(names) {
    if (!Array.isArray(names)) names = [names]
    names.forEach(name => {
      // it is a preset that has already been required
      if (typeof name === 'object') return this.usePreset(name)
      const resolved = require.resolve(name) || require.resolve('fliphub-preset-' + name)
      if (resolved) return this.usePreset(require(resolved))

      // needs custom error & tostring the arg
      else throw new Error('preset was not available @TODO')
    })
    return this
  }

  // @TODO:
  // - [ ] add merge for `plugins`
  // - [ ] check if it has a `toConfig` method if it exports a chain
  usePreset(preset) {
    return this.merge(preset)
  }

  merge(obj = {}) {
    if (obj.toMerge) obj = obj.toMerge()
    else if (obj.toConfig) obj = obj.toConfig()
    Object
      .keys(obj)
      .forEach(key => {
        const value = obj[key]
        switch (key) {
          case 'alias': {
            return this[key].merge(value)
          }
          case 'cache':
          case 'log':
          case 'target':
          case 'debug':
          case 'sourceMaps':
          case 'root':
          case 'output': {
            return this.set(key, value)
          }
          case 'shim': {
            const val = this.get(key)
            const updated = deepmerge(val, value)
            return this.set(key, updated)
          }
          case 'parent': return

          default: {
            this.set(key, value)
          }
        }
      })

    return this
  }

  toConfig() {
    const chainedConfigs = this.chains.map(name => {
      const chain = this[name]
      if (chain.toConfig) return chain.toConfig()
      else throw new Error(`chain ${name} must implement toConfig`)
    })

    return this.clean(Object.assign(this.entries() || {}, {
      plugins: this.plugins.toConfig(),
    }))
  }
}
