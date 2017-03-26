'use strict';

const timer = require('fliptime');
const log = require('fliplog');
const flipflag = require('flipflag');
const { Core, resolve } = require('fliphub-core');
const Workflow = require('./Workflow');
const Ops = require('./Ops');

module.exports = class FlipBox extends Core {
  static init(config) {
    return new FlipBox(config);
  }

  setupDebug(config) {
    // setup for benchmarking with buildFast
    if (!flipflag('apps')) timer.start('totals');
    timer.start('flip');
    timer.start('setup');
    log.filter(config.debug);
    log.filter(['!toconfig',
    // '!events',
    // '!core&create',
    '!initConfig']);
    delete config.debug;
    return this;
  }
  setupRoot(config) {
    resolve.setRoot(config.root);
    config.root = resolve.root;
    return this;
  }

  constructor(config) {
    super(config).setupDebug(config).setupRoot(config);

    this.config = config;
    this.workflow = new Workflow(this, config);
    this.ops = new Ops(this.workflow);

    log.text('fliphub-core-create').tags('core,init,create').data(this.workflow).verbose(3).echo();
  }

  setup() {
    const config = this.config;
    log.tags('setup,apps').text('👨‍🔧  ⌛  setting up: ').xterm('yellow').echo();

    const workflow = this.workflow;
    // workflow.emitForContexts('pre')
    workflow.contextsFrom(config.apps);
    workflow.emitForContexts('merge.pre');
    workflow.coreConfig.merge(config);
    workflow.emitForContexts('merge.post');
    workflow.emitForContexts('init');
    workflow.emitForContexts('init.post');
    return this;
  }
};