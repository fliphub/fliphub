import ChainedMap from './core/ChainedMap'
import ChainedMapExtendable from './core/ChainedMapExtendable'
import Plugin from './Plugin'

class Plugins extends ChainedMapExtendable {
  public inittable: ChainedMap = new ChainedMap(this)

  public plugin(name: string) {
    if (!this.has(name)) {
      this.set(name, new Plugin(this))
    }

    return this.get(name)
  }
}

export {Plugins}
export default Plugins
