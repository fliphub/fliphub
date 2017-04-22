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
    let api = workflow.current.bundler.api
    if (api && api.config) {
      config = workflow.current.bundler.api.config
    }

    // fallback to object if they are inheriting/using-reusable configs
    const toConfiged = config.toConfig() || {}

    const to = context.flips.to
    this.to = to

    // log.quick(toConfiged)
    if (to === 'webpack') {
      const Neutrino = require('./Bundlers/Neutrino')
      // const Neutrino = require('neutrino')
      // console.log(Neutrino)
      // process.exit()
      // log.data(Neutrino).exit()
      // const WebpackChain = require('flip-webpack-chain')
      // config = new WebpackChain().merge(toConfiged)
      const neutrino = new Neutrino()
      // const neutrino = new Neutrino()
      neutrino.toConfig = neutrino.getWebpackOptions
      neutrino.config.merge(toConfiged)
      // @TODO...
      // workflow.current.bundler.config = neutrino.config
      // log.quick(neutrino.toConfig())
      // neutrino.config = config
      api = neutrino
    }
    else if (to === 'rollup') {
      const RollupConfig = require('./Bundlers/Rollup')
      api = new RollupConfig(this)
      api.config.merge(toConfiged)
    }
    else if (to === 'fusebox') {
      const FuseBoxConfig = require('./Bundlers/FuseBox')
      api = new FuseBoxConfig(this, context)
      api.config.merge(toConfiged)
    }

    workflow.current.bundler.api = api
  }
  postInit(workflow) {
    const {to} = workflow.current.config.entries()
    // if (to !== this.to) this.init(workflow)
  }
}
