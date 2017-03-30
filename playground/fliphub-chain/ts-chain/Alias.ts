import ChainedMapExtendable from './core/ChainedMapExtendable'
import * as rollupAliasPlugin from 'rollup-plugin-alias'

// https://webpack.js.org/configuration/resolve/
class Alias extends ChainedMapExtendable {
  // @TODO:
  // needs better way of decorating
  // when say merging
  // unless we only allow alias as a plugin :-(
  public init(parent) {
    // @NOTE:
    // this could also be on the data itself since rollup is agnostic
    // and could be deleted if set in webpack
    // this.decorateParent([{
    //   key: 'resolve',
    //   method: 'resolveAlias',
    // }])
    // const resolve = this.decorated ? this.decorated.get('resolve') : false

    // @TODO: think about this more, see ^ ^ comment
    // const config = this.entries()
    // this.parent.plugins.plugin('alias', config)
    // this.parent.plugins.register('alias', rollupAliasPlugin)
  }

  public toConfig() {
    return {}
  }
}

export {Alias}
export default Alias
