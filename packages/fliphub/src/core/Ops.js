const execa = require('execa')
const tinyPromiseMap = require('tiny-promise-map')
const timer = require('fliptime')
const log = require('fliplog')
const flipflag = require('flipflag')
const childToParentMethods = require('childparent')
const Run = require('./Run')

module.exports = class Ops {

  /**
   * @see childparent
   * @param  {Workflow} workflow
   */
  constructor(workflow) {
    this.workflow = workflow
    childToParentMethods({
      child: this,
      parent: workflow.core,
      thisArg: this,
    })
  }

  /**
   * @since 0.1.0
   * @see Workflow.core.setup
   */
  ensureSetup() {
    if (!this.workflow.core.state.setup) this.workflow.core.setup()
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

  /**
   * @since 0.1.0
   * @return {Array<Object>} bundler config
   */
  toConfig() {
    this.ensureSetup()
    const configs = this.workflow.mapContexts(context => context.toConfig())
    const apps = this.workflow.mapContexts(context => context.name)
    this.workflow.core.persistConfigs(apps, configs)
    timer.stop('totals').log('totals')
    return configs
  }

  /**
   * @TODO: abstract
   * @return {Promise}
   */
  devServer() {
    this.ensureSetup()
    const results = []
    const built = this.workflow.contexts

    const configs = this.toConfig()
    // const config = context.bundler.config.toConfig()

    Object.keys(built).forEach((name, i) => {
      const run = new Run()
      const context = built[name]
      const config = configs[i]
      const result = run.handle(config, {name})

      // const result = context.bundler.api.devServer().catch(log.catch)
      results.push(result)
    })

    return Promise.all(results).then(result => {
      timer.stop('totals').log('totals')
      log.startSpinners([
        '🤾     ',
        '🤾     ',
        '∞🤾    ',
        '∞🤾    ',
        ' ∞🤾   ',
        ' ∞🤾   ',
        '  ∞🤾∞ ',
        '  ∞🤾∞ ',
        '  ∞∞🤾 ',
        '   ∞🤾 ',
        '   ∞🤾 ',
        '  ∞∞🤾 ',
        ' ∞🤾∞  ',
        ' ∞🤾∞  ',
        ' 🤾∞∞  ',
        ' 🤾∞∞  ',
        '🤾∞    ',
        '🤾∞    ',
      ])

      return Promise.resolve(result)
    })
  }

  /**
   * @return {Promise}
   */
  build() {
    this.ensureSetup()
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
    return Promise.all(results)
  }

  /**
   * @return {Promise}
   */
  buildSync() {
    this.ensureSetup()
    const built = this.workflow.contexts
    return tinyPromiseMap(built, (name, last) => {
      const context = built[name]
      return context.bundler.api.build().catch(log.catch)
    })
    // .then(this.stopSpinner)
  }

  /**
   * @TODO:
   * - [ ] flag the other builds,
   * - [ ] preset for flagging which op to call
   *
   * @since 0.1.1
   * @return {Promise}
   */
  buildFast() {
    // this.ensureSetup()
    if (flipflag('apps')) return this.build()

    return new Promise(resolve => {
      let closed = 0
      const main = require.main.filename
      const names = Object.keys(this.workflow.contexts)
      const timed = () => {
        if (closed++ === names.length) {
          timer.stop('totals').log('totals')
          resolve(names)
        }
      }

      names.forEach((name, i) => {
        const cliFlags = [main, `--apps=${name} --build-fast=true`]
        execa('node', cliFlags, {stdio: 'inherit'}).then(timed)
      })

      log.stopSpinner()
      return timed
    })
  }
}
