const is = require('izz')
const log = require('fliplog')
const {Hub} = require('fliphub-core')

module.exports = class BundlerFlipper extends Hub {

  /**
   * @event context.*.init
   * @param {Workflow} workflow
   */
  init(workflow) {
    const context = workflow.current.config.entries()
    let config = workflow.current.bundler.config
    let api
    const to = context.flips.to

    if (to === 'webpack') {
      const Neutrino = require('./Bundlers/Neutrino')
      const WebpackChain = require('flip-webpack-chain')
      config = new WebpackChain().merge(config.toConfig())
      const neutrino = new Neutrino()
      neutrino.toConfig = neutrino.getWebpackOptions
      neutrino.config.merge(config.toConfig())
      api = neutrino
    }
    else if (to === 'rollup') {
      const RollupConfig = require('./Bundlers/Rollup')
      api = new RollupConfig(this)
      api.config.merge(config)
    }
    else if (to === 'fusebox') {
      const FuseBoxConfig = require('./Bundlers/FuseBox')
      api = new FuseBoxConfig(this, context)
      api.config.merge(config)
    }

    workflow.current.bundler.api = api
  }
}
