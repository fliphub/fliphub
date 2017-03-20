import {Bundle as BundleInterface} from '../core/Bundle'
import ChainedMap from './core/ChainedMap'
import ChainedSet from './core/ChainedSet'
import Config from './Config'

class Bundle implements BundleInterface {}

class Chunks extends ChainedMap {

}

class Bundles extends ChainedSet {
  public chunks: Chunks = new Chunks(this)
  public config: Config

  public inherit(config) {
    this.config = config
    return this
  }

  public toConfig() {
    return this.values()
  }
  public handle(bundles: Bundle[]) {
    for (const i in bundles) {
      const bundle = bundles[i]
      this.chunks.set(bundle.name || i, bundle)
    }
    return this
  }
}

export {Bundles}
export default Bundles
