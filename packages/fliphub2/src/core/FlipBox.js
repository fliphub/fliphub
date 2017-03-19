const evts = require('./Events')
const Filter = require('../hubs/FilterHub')
const AppsContext = require('./AppsContext')
const Hubs = require('../hubs/LifeCycleHub')
const FlipConfig = require('../hubs/ConfigHub/FlipConfig')

const helpers = require('fliphub-helpers')
const resolve = require('fliphub-resolve')
const timer = require('fliptime')
const log = require('fliplog')
const {debugForFlags} = require('fliplog/debugFor')
const {inspectorGadget} = require('inspector-gadget')

const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')

module.exports = class FlipBox extends ChainedMapExtendable {
  static init(config) {
    return new FlipBox(config)
  }

  constructor(config) {
    super(config)
    this.inspect = inspectorGadget(this, ['hubs', 'filterer', 'parent'])

    timer.start('flip')
    timer.start('setup')

    resolve.setRoot(config.root)
    this.root = config.root = resolve.root

    this.flipConfig = new FlipConfig(this)
    if (config) this.flipConfig.merge(config)

    this.helpers = helpers
    this.debugFor = debugForFlags('*') // @TODO: config
    this.setupEvents()
    this.preSetup(config)


    this.ops = {
      build: () => {
        const results = []
        for (let name in this.built) {
          const context = this.built[name]
          results.push(context.api.build())
        }
        return results
      },
    }

    // build builds the config setup...
    // need to expose other methods
    // such as presets... apps... flip...
    // how to best manage operations...
    //
    // if they want to call `.devServer`, or `execute`...
    // or all of them are presets, and only core configs are here...
    this.setup = () => {
      this.setupFilter()
      if (this.filtered.length === 0) return

      timer.start('build')
      this.built = this.apps.build()
      timer.stop('build').log('build')
      timer.stop('flip').log('flip')

      return this.built
    }
    this.mediator = () => this.built
    timer.stop('setup').log('setup')
  }

  toConfig() {
    return Object
      .keys(this.built)
      .map(built => this.built[built].toConfig())
  }
  presets() {
    return this.flipConfig.presets
  }

  // @TODO:
  // make this happen after instantiate
  // such as in `build`
  // or add another lifecycle event, `instantiate` instead of `setup`
  //
  // so we could do dry runs and such as needed
  preSetup(config) {
    this.hubs = new Hubs(this)
    this.apps = new AppsContext(config.apps, this)

    // if this filters auto and it is before apps are decorated
    // then it will only do `defaultApps`, `--apps`, and passed in filters
    this.filterer = new Filter(this)
    this.filterer.onBoxSetup({apps: this.apps, box: this})
  }

  filter(filter) {
    this.filtered = this.filterer.filter(filter).filteredNames
  }

  setupFilter() {
    // if the client already filtered, ignore
    if (!this.filtered) this.filtered = this.filterer.filterAuto().filteredNames
    if (this.filtered.length === 0)
      log.text(`🕳  had no apps, all empty eh.`).color('bold').echo()
    else this.apps.setup()
  }

  // should really be on `AppsContext` ?
  setupEvents() {
    this.evts = evts
    this.emit = (a1, a2, a3, a4, a5) => this.evts.emit(a1, a2, a3, a4, a5)
    this.evts.onAny(function(event, value) {
      // if (event == 'removeListener') return
      // console._text('FLIPBOX: ' + event)
    })
    this.on = (name, handler) => this.evts.on(name, handler)
  }
}
