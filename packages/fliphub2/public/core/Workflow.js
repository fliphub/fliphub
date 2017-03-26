'use strict';

const is = require('izz');
const { AbstractWorkflow } = require('fliphub-core');
const Context = require('./Context');
const CoreConfig = require('./configs/Core');

module.exports = class Workflow extends AbstractWorkflow {
  constructor(core, config) {
    const coreConfig = new CoreConfig(core);
    super(core, coreConfig);
    this.root = coreConfig.root;
    this.contextsFrom = this.contextsFrom.bind(this, Context);
  }
};