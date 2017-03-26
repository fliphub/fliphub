const is = require('izz')
const execa = require('execa')
const tinyPromiseMap = require('tiny-promise-map')
const timer = require('fliptime')
const log = require('fliplog')
const flipflag = require('flipflag')
const childToParentMethods = require('fliphub-helpers/obj/childToParentMethods')

module.exports = class Ops {
  constructor(workflow) {
    this.workflow = workflow
    childToParentMethods({
      child: this,
      parent: workflow.core,
      thisArg: this,
    })
  }

  /**
   * @see fliplog.stopSpinner
   * @return {Function} @return Promise.resolve
   */
  stopSpinner() {
    return (data) => {
      log.stopSpinner()
      return Promise.resolve(data)
    }
  }

  toConfig() {
    return this.workflow.mapContexts((context) => context.toConfig())
  }

  build() {
    const results = []
    const built = this.workflow.contexts
    // log.verbose(5).quick({built})
    Object.keys(built).forEach((name) => {
      const context = built[name]
      const result = context.bundler.api.build().catch(log.catch)
      results.push(result)
    })

    // if (is.arrOf(results, is.promise)) {
    //   Promise.all(results).then(() => timer.stop('totals').log('totals'))
    // }
    return results
  }

  buildSync() {
    const built = this.workflow.contexts
    return tinyPromiseMap(built, (name) => {
      const context = built[name]
      return context.api.build().catch(log.catch)
    }).then(this.stopSpinner)
  }

  // @TODO:
  // flag the other builds,
  // preset for flagging which op to call
  buildFast() {
    if (flipflag('apps')) return this.build()

    let closed = 0
    const main = require.main.filename
    const names = Object.keys(this.workflow.contexts)
    const timed = () => {
      if (closed++ === 2) timer.stop('totals').log('totals')
    }

    names.forEach((name) => {
      const cliFlags = [main, `--apps=${name}`]
      execa('node', cliFlags, {stdio: 'inherit'}).then(timed)
    })

    log.stopSpinner()
    return null
  }
}
