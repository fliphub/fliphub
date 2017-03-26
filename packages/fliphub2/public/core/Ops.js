'use strict';

const is = require('izz');
const execa = require('execa');
const tinyPromiseMap = require('tiny-promise-map');
const timer = require('fliptime');
const log = require('fliplog');
const flipflag = require('flipflag');
const childToParentMethods = require('fliphub-helpers/obj/childToParentMethods');

module.exports = class Ops {
  constructor(workflow) {
    this.workflow = workflow;
    childToParentMethods({
      child: this,
      parent: workflow.core,
      thisArg: this
    });
  }

  toConfig() {
    return this.workflow.mapContexts(context =>
    // log.data(context.toConfig()).exit()
    context.toConfig());
  }

  built() {
    // return this.workflow.core.context.built
    return this.workflow.contexts;
  }
  build() {
    const results = [];
    const built = this.built();
    // log.verbose(5).quick({built})
    Object.keys(built).forEach(name => {
      const context = built[name];
      const result = context.bundler.api.build().catch(log.catch);
      results.push(result);
    });

    // if (is.arrOf(results, is.promise)) {
    //   Promise.all(results).then(() => timer.stop('totals').log('totals'))
    // }
    return results;
  }

  buildSync() {
    const built = this.built();
    return tinyPromiseMap(built, name => {
      const context = built[name];
      return context.api.build().catch(log.catch);
    });
  }

  // @TODO:
  // flag the other builds,
  // preset for flagging which op to call
  buildFast() {
    if (flipflag('apps')) return this.build();

    let closed = 0;
    const main = require.main.filename;
    const names = Object.keys(this.built());
    const timed = () => {
      if (closed++ === 2) timer.stop('totals').log('totals');
    };

    names.forEach(name => {
      const cliFlags = [main, `--apps=${name}`];
      execa('node', cliFlags, { stdio: 'inherit' }).then(timed);
    });

    return null;
  }
};