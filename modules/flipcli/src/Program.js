const {inspectorGadget} = require('inspector-gadget')
const {ChainedMap, ChainedSet, vorpal, flipflag, flipscript} = require('./deps')

const {ScriptFlip} = flipscript

const ignore = [
  'parent', 'workflow', 'currentVorpal', '_parent', 'util', 'lodash',
]

module.exports = class Program extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.inspect = inspectorGadget(this)
    this.actions = new ChainedSet(this, ignore)
    this.middleware = {}
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
    this.hide = () => {
      this.vorpal.hide()
      return this
    }
    this.history = (id) => {
      this.vorpal.history(id)
      return this
    }
    this.localStorage = this.vorpal.localStorage
    this.commands = this.vorpal.commands
    this.util = this.vorpal.util
    this.vorpal.inspect = inspectorGadget(this, ignore.concat(['vorpal']))

    // as a preset?
    this.parseEnv = (argv = process.argv) => {
      if (this.middleware.script) {
        const snd = flipflag.searchAndDestroy
        // const production = true
        // const development = false
        // const production = snd('p', argv) || snd('production', argv)
        // const development = snd('d', argv) || snd('development', argv)
        const production = snd('-p', argv) || snd('--production', argv)
        const development = snd('-d', argv) || snd('--development', argv)

        if (production) {
          this.middleware.script.env('NODE_ENV', 'production')
        }
        else if (development) {
          this.middleware.script.env('NODE_ENV', 'development')
        } else {
          this.middleware.script.env('NODE_ENV', process.env.NODE_ENV)
        }
      }

      return this.parse(argv)
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

    // autocomplete, allowUnknownOptions
    this.description = (...args) => {
      // console.log('adding command...', args)
      this.currentVorpal = this.vorpal.description(...args)
      return this
    }
    this.action = (...args) => {
      // console.log('adding action...', args)
      this.currentVorpal.action(...args)
      return this
    }
    this.option = (...args) => {
      this.currentVorpal.option(...args)
      return this
    }

    this.delimiter()
    return this
  }

  use(middleware) {
    if (!middleware) {
      return this
    }
    if (middleware instanceof ScriptFlip) {
      this.middleware.script = middleware
    }
    else {
      const key = middleware.name || middleware.constructor.name
      this.middleware[key] = middleware
    }
    return this
  }


  /**
   * @param {string} name
   * @param {string} [type]
   * @param {string} [msg]
   * @param {Function} [cb]
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
