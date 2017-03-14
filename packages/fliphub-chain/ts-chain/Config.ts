import ChainedMap from './core/ChainedMap'
import ChainedMapExtendable from './core/ChainedMapExtendable'
import Plugin from './Plugin'
import Plugins from './Plugins'
import DevServer from './DevServer'
import deepmerge from 'deepmerge'

class Config extends ChainedMapExtendable {
  public plugins: Plugins
  public devServer: DevServer
  public package: Function
  public resolve: any
  public alias: any

  constructor(any: any) {
    super(any)
    this.devServer = new DevServer(this)
    this.plugins = new Plugins(this)
    this.alias = new ChainedMap(this)

    this.extendBool([
      'cache',
      'log',
      'debug',
    ], true)
    this.extend([
      'globals',
      'target',
      'homeDir',
      'outFile',
      'sourceMaps',
      'autoImport',
      'shim',
    ])
  }
  public plugin(name: any) {
    if (!this.plugins.has(name)) {
      this.plugins.set(name, new Plugin(this))
    }

    return this.plugins.get(name)
  }

  public toFuseBox() {
    const alias = this.alias.entries()
    const {
      cache, log, target,
      debug, globals, homeDir,
      sourceMaps,
      shim, autoImport,
    } = this.entries()

    const plugins = []
    const pluginsByName = this.plugins.inittable
    Object.keys(this.plugins.entries()).forEach(name => {
      if (!name.includes('plugin')) name += 'plugin'
      name = name.toLowerCase()
      const conf = this.plugins.get(name)
      const fsbxPlug = this.plugins.inittable.get(name)
      if (fsbxPlug) {
        const plug = fsbxPlug(conf)
        plugins.push(plug)
      }
      delete this.plugins.parent
    })
    const config = {
      autoImport, shim, plugins, debug, cache, globals,
      homeDir, log, target, alias, sourceMaps,
    }
    console.verbose(config)
  }
  merge(obj = {}) {
    Object
      .keys(obj)
      .forEach(key => {
        const value = obj[key]
        console.log(value)
        switch (key) {
          case 'alias': {
            return this[key].merge(value)
          }
          case 'cache':
          case 'log':
          case 'resolve':
          case 'target':
          case 'debug':
          case 'sourceMaps':
          case 'homeDir':
          case 'globals': {
            return this.set(key, value)
          }
          case 'autoImport':
          case 'shim': {
            const val = this.get(key)
            const updated = deepmerge(val, value)
            return this.set(key, updated)
          }

          // default: {
          //   this.set(key, value)
          // }
        }
      })

    return this
  }
}

export {Config}
export default Config
