import Chainable from './core/Chainable'
import ChainedMap from './core/ChainedMap'
import ChainedMapExtendable from './core/ChainedMapExtendable'
import {Config as ConfigInterface} from '../core/Config'
import {Alias as AliasChain} from './Alias'
import {Plugins as PluginsChain} from './Plugins'
import Plugin from './Plugin'
import DevServer from './DevServer'
import * as deepmerge from 'deepmerge'
export type Preset = ConfigInterface

class Config extends ChainedMapExtendable implements ConfigInterface {
  public chains: Array<string> = []
  public bundles: Chainable = this.parent

  // @TODO:
  // setup plugin defaults, as a lifecycle methods on config decorators
  // (which means plugins, alias, devServer, and bundles
  // would be default config decorated chains)
  //
  // then, have configs have `defaults` registering their defaults
  // IF config does not have `defaults: false`
  //
  // when the first operation runs (such as `watch`, etc, then we run defaults)
  //
  // should this class have internal property `config` which has our metadata
  // but is not the `bundlerConfig` ?
  //
  //
  // should have `pre`, and `post` methods on the config,
  // for things such as the aliasLoader
  constructor(any: any) {
    super(any)

    this.extendBool([
      'cache',
      'log',
      'debug',
    ], true)
    this.extend([
      'outFile',
      'sourceMaps',
    ])

    this.setupDefaults()
  }

  public static init(preferences: any) {
    return new Config(preferences)
  }

  private setupDefaults() {
    return this
      .addChain('plugins', PluginsChain)
      .addChain('alias', AliasChain)
      // .addChain('bundles', BundlesChain)
      // .addChain('devServer', DevServer)
  }

  public plugin(name: any, ...args) {
    this.plugins.plugin(name, ...args)
    return this
    // return this.plugins.get(name)
  }

  // @TODO:
  // require a namespace for published presets (akin to eslint)
  // such as `glue-preset-react`
  // try to require it here, if it cannot be required, decide the best route
  // 1. warn
  // 2. error
  // 3. install, restart with a subprocess
  public presets(names: string | string[] | Preset | Preset[]) {
    if (!Array.isArray(names)) names = [names]
    names.forEach(name => {
      // it is a preset that has already been required
      if (typeof name === 'object') return this.usePreset(name)
      const resolved = require.resolve(name) || require.resolve('glue-preset-' + name)
      if (resolved) return this.usePreset(require(resolved))

      // needs custom error & tostring the arg
      else throw new Error('preset was not available @TODO')
    })
    return this
  }

  // @TODO:
  // - [ ] add merge for `plugins`
  // - [ ] check if it has a `toConfig` method if it exports a chain
  public usePreset(preset: Preset | any) {
    return this.merge(preset)
  }

  public merge(obj: ConfigInterface = {}) {
    if (obj.toMerge) obj = obj.toMerge()
    else if (obj.toConfig) obj = obj.toConfig()
    Object
      .keys(obj)
      .forEach(key => {
        const value = obj[key]
        switch (key) {
          case 'plugins':
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
          case 'autoImport':
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

  // @TODO: use adapter to adapt here when needed
  public toConfig() {
    const chainedConfigs = this.chains.map(name => {
      const chain = this[name]
      if (chain.toConfig) return chain.toConfig()
      else throw new Error(`chain ${name} must implement toConfig`)
    })

    return this.clean(Object.assign(this.entries() || {}, {
      plugins: this.plugins.toConfig(),
      // devServer: this.devServer.entries(),
    }))
  }
}

export {Config}
export default Config
