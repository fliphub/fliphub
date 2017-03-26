'use strict';

const is = require('izz');
const log = require('fliplog');
const { AbstractContext } = require('fliphub-core');
const BundlerConfig = require('./configs/Bundler');
const Config = require('./configs/Context');

module.exports = class Context extends AbstractContext {

  /**
   * @param {Workflow}
   */
  constructor(workflow) {
    super(workflow);
    this.workflow = workflow;
  }

  /**
   * @see Workflow.contextsFrom
   * @event context.config.pre
   * @param {Object} opts - user config / app / opts
   */
  preConfig(opts) {
    this.bundler = {
      api: {},
      config: new BundlerConfig(this).merge(opts)
    };
    this.config = new Config(this.workflow);
    this.opts = opts;

    log.tags('initConfig,config,context' + this.name).text('initConfig ' + this.name).echo();
  }

  /**
   * this is so we can create the config,
   * then we can merge in our config once we've decorated it
   * @see Presets
   *
   * @see this.preConfig
   * @event context.config
   * @param {Object} config - user config / app / opts
   */
  initConfig(opts) {
    this.config.merge(this.opts);
    delete this.opts;
  }

  /**
   * @return {Bundler.toConfig}
   */
  toConfig() {
    log.tags('toconfig,app,context,bundler,' + this.name).color('bold').text('app-context-to-config ' + this.name).data(this.bundler).verbose(3).echo();
    return this.bundler.config.toConfig();
  }
};