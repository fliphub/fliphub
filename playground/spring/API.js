const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const deepmerge = require('deepmerge')
// const AppFlipConfig = require('./AppFlipConfig')
// const BundlerConfig = require('./BundlerConfig')
const App = require('./App')
const FlipConfig = require('./FlipConfig')

// and maybe have
// FlipHub.fluent()
// as a way to enable full fluent mode?

// const apps = [app1, app2]
// FlipHub.init({config}, apps)
//
// FlipHub
// .init({config})
// .app(app1)
// .app(app2)
//
// .use for presets?

module.exports = class API extends ChainedMapExtendable {
  static init(config) {
    return new API(config)
  }

  constructor(config) {
    super(config)
    this.parent = this
    this.apps = new ChainedMapExtendable(this)
    // let bundles = config.bundles
    // if (bundles) delete config.bundles

    this.flipConfig = new FlipConfig(this)
    if (config) this.flipConfig.merge(config)
  }

  // AppFlipConfig
  // BundlerConfig


  // toConfig() {
  //   return {
  //     bundles: this.bundles.toConfig(),
  //     config: this.config.toConfig(),
  //   }
  // }
}
