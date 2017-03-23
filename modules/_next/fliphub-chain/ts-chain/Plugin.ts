import ChainedMap from './core/ChainedMap'
import {Plugin as PluginInterface} from '../plugins/Plugin'

function isClass(obj): boolean {
  return toString.call(obj) === '[object Function]'
}

class Plugin extends ChainedMap implements PluginInterface {
  constructor(parent: any) {
    super(parent)
    this.extend(['init'])

    // @TODO: HACK: !IMPORTANT: this silly map .call issue + ts
    this.init((PluginClassOrFn, args = []) => {
      if (!PluginClassOrFn) return args
      if (isClass(PluginClassOrFn)) return new PluginClassOrFn(args)
      if (typeof PluginClassOrFn === 'function') return PluginClassOrFn.call(null, args)
      return PluginClassOrFn
    })
  }

  // @NOTE: should be decorated by parent...
  public plugin(...args) {
    return this.parent.plugin(...args)
  }

  public and() {
    return this.parent
  }

  public use(plugin: any, args = []) {
    return this
      .set('plugin', plugin)
      .set('args', args)
  }

  public tap(f: any) {
    this.set('args', f(this.get('args') || []))
    return this
  }

  public merge(obj: Object) {
    if (obj.plugin) {
      this.set('plugin', obj.plugin)
    }

    if (obj.args) {
      this.set('args', obj.args)
    }

    return this
  }

  public toConfig() {
    const init = this.get('init')
    return init(this.get('plugin'), this.get('args'))
  }
}

export {Plugin}
export default Plugin
