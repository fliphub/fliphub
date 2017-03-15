import ChainedMap from './core/ChainedMap'
import ChainedMapExtendable from './core/ChainedMapExtendable'
import Plugin from './Plugin'
import * as deepmerge from 'deepmerge'

export interface PluginArg {
  [name: string]: PluginArg | any
}

class Plugins extends ChainedMapExtendable {
  public registered: ChainedMap = new ChainedMap(this)

  // @NOTE:
  // this way, we can set all the plugins we have available
  // we can use metadata to determine how best to use the plugin
  // (if it is conditionally used)
  public register(name: string, plugin: any, metadata: any) {
    this.registered.set(name, plugin)
    return this.parent
  }

  public add(plugins: PluginArg) {
    for (const name in plugins) {
      const args = plugins[name]
      this.plugin(name, args)
    }
    return this.parent
  }

  public plugin(name: string, args?: any) {
    if (!this.has(name)) this.set(name, new Plugin(this))
    if (args) this.get(name).set('args', args)
    return this.get(name)
  }

  public merge(obj: Plugins) {
    if (obj.toConfig) obj = obj.toConfig()
    Object
      .keys(obj)
      .forEach(key => {
        const value = obj[key]
        switch (key) {
          case 'registered':
            return this[key].merge(value);
          default: {
            if (this.has(key))
              this.set(key, deepmerge(this.get(key), value))
            else
              this.set(key, value)
          }
        }
      })

    return this
  }

  public toConfig() {
    // registered plugins, the functions themselves
    const registered = this.registered.entries()

    // plugin configs
    const options = this.options
    const configs = this.options.values()
    const configuredNames = Object.keys(configs)

    const plugins = []
    this.options.forEach((plugin, name) => {
      if (this.registered.has(name)) {
        const fn = this.registered.get(name)
        plugin.set('plugin', fn)
      }
      plugins.push(plugin.toConfig())
    })

    return {plugins, registered}
  }
}

export {Plugins}
export default Plugins
