const evts = require('./Events')
const AppsContext = require('./AppsContext')
const makeHelpers = require('fliphub-helpers')
const Hubs = require('../hubs/LifeCycleHub')
const Filter = require('../hubs/FilterHub')

// @TODO: export this for easy hub extension
const AbstractHub = require('../hubs/AbstractHub')

// @TODO: auto decorator that is for chaining all methods
class FlipBox {
  constructor(config) {
    global._timer.start('flip')
    global._timer.start('setup')
    this.helpers = makeHelpers(config)
    this.inspect = inspectorGadget(this, ['hubs', 'filter'])
    this.debugFor = this.helpers.debugForKeys(config)
    this.root = this.helpers.resolve.root
    this.setupEvents()

    // @TODO:
    // remove, this was test usage of place it would be done
    // this.evts.on('translate.*', (data) => console._exit(data))

    this.setup(config)

    this.fullAuto = this.build = () => {
      if (this.filtered.length === 0) return
      global._timer.start('build')
      const built = this.apps.build()
      this.built = built
      global._timer.stop('build').log('build')
      global._timer.stop('flip').log('flip')
      return built
    }
    this.mediator = () => this.built[0]

    global._timer.stop('setup').log('setup')
  }

  // @TODO:
  // make this happen after instantiate
  // such as in `build`
  // or add another lifecycle event, `instantiate` instead of `setup`
  //
  // so we could do dry runs and such as needed
  setup(config) {
    this.hubs = new Hubs(this)
    this.apps = new AppsContext(config.apps, this)

    // if this filters auto and it is before apps are decorated
    // then it will only do `defaultApps`, `--apps`, and passed in filters
    this.filter = new Filter(this)
    this.filter.onBoxSetup({apps: this.apps, box: this})
    this.filtered = this.filter.filterAuto().filteredNames
    if (this.filtered.length === 0)
      console.text(`🕳  had no apps, all empty eh.`, {color: 'bold'})
    else this.apps.setup()
  }

  // should really be on `AppsContext` ?
  setupEvents() {
    this.evts = evts
    this.emit = (a1, a2, a3, a4, a5) => {
      this.evts.emit(a1, a2, a3, a4, a5)
    }
    this.evts.onAny(function(event, value) {
      // if (event == 'removeListener') return
      // console._text('FLIPBOX: ' + event)
    })

    // this.emitForApp = this.onApp =
    this.on = (name, handler) => this.evts.on(name, handler)
  }
}

// FlipBox.cli = makeHelpers.lib
FlipBox.helpers = makeHelpers.lib
FlipBox.flags = FlipBox.helpers.flags.searchAll
FlipBox.AbstractHub = AbstractHub
FlipBox.init = config => new FlipBox(config)
module.exports = FlipBox
