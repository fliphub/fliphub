const {AbstractContext} = require('fliphub-core')
const resolver = require('fliphub-resolve')
const BundlerConfig = require('./configs/Bundler')
const Config = require('./configs/Context')

module.exports = class Context extends AbstractContext {

  /**
   * @param {Workflow} workflow
   */
  constructor(workflow) {
    super(workflow)
    this.workflow = workflow
    this.resolver = resolver.scoped(this.name).setRoot(1)
  }

  /**
   * @see Workflow.contextsFrom
   * @event context.config.pre
   * @param {Object} opts - user config / app / opts
   */
  preConfig(opts) {
    this.bundler = {
      api: {},
      config: new BundlerConfig(this).merge(opts),
    }
    this.config = new Config(this.workflow)
    this.opts = opts

    this.workflow.log
      .tags('initConfig,config,context' + this.name)
      .text('initConfig ' + this.name)
      .echo()
  }

  /**
   * this is so we can create the config,
   * then we can merge in our config once we've decorated it
   * @see Presets
   *
   * @see this.preConfig
   * @event context.config
   * @param {Object} opts - user config / app / opts
   */
  initConfig(opts) {
    this.config.merge(this.opts)
    delete this.opts
  }

  /**
   * @return {Bundler.toConfig}
   */
  toConfig() {
    this.workflow.log
      .tags('toconfig,app,context,bundler,' + this.name)
      .color('bold')
      .text('app-context-to-config ' + this.name)
      .data(this.bundler)
      .verbose(3)
      .echo()

    if (this.bundler.api) return this.bundler.api.toConfig()
    return this.bundler.config.toConfig()
  }
}
