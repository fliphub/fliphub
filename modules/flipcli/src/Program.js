const {ChainedMap, ChainedSet, vorpal} = require('./deps')

module.exports = class Program extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.actions = new ChainedSet(this)
  }

  /**
   * @TODO: get the pkg json version
   * @param {string} [version]
   * @return {Vorpal} new
   */
  program(version = null) {
    this.vorpal = vorpal
    this.vorpal.version(version || '1.0.0')

    // this.vorpal.actionPrompt = this.actionPrompt.bind(this)

    this.delimiter = (delimiter = '🏗  fliphub ➜') => {
      this.vorpal.delimiter(delimiter)
      return this
    }
    this.show = (show) => {
      this.vorpal.show(show)
      return this
    }
    this.parse = (argv = process.argv) => {
      this.vorpal.parse(argv)
      return this
    }

    this.alias = (alias) => {
      this.currentVorpal.alias(alias)
      return this
    }
    this.command = (...args) => {
      // console.log('adding command...', args)
      this.currentVorpal = this.vorpal.command(...args)
      return this
    }
    this.action = (...args) => {
      // console.log('adding action...', args)
      this.currentVorpal.action(...args)
      return this
    }

    this.delimiter()
    return this
  }

  /**
   * @return {Vorpal}
   */
  actionPrompt(name, type = 'checkbox', msg = null, cb = null) {
    const Core = require('./Core')
    const cli = new Core(this)
    const step = cli.step(name, type, msg, cb)

    this.current = cli
    this.actions.add(cli)

    if (cb === null) cb = (data) => Promise.resolve(data)

    this.action((args) => {
      console.log(args)
      cli.run().then(cb)
    })

    return step
  }
}
