import ChainedMap from './core/ChainedMap'

class Plugin extends ChainedMap {
  constructor(parent: any) {
    super(parent)
    this.extend(['init'])
    this.init((Plugin, args = []) => new Plugin(...args))
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
