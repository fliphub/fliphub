const is = require('izz')
const log = require('fliplog')
const {inspectorGadget} = require('inspector-gadget')
const {debugForFlags} = require('fliplog/debugFor')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const AppConfig = require('../hubs/ConfigHub/App')
const BundlerExtractor = require('../hubs/ConfigHub/BundlerExtractor')
const ConfigDefaulter = require('../hubs/ConfigHub/ConfigDefaulter')
const Presetter = require('../hubs/ConfigHub/Presetter')
const evts = require('./Events')

class AppContext extends ChainedMapExtendable {
  constructor(app, box) {
    super(box)
    this.inspect = inspectorGadget(this, ['box', 'app', 'translator', 'hub'])
    this.debugFor = debugForFlags('*')
    this.name = is.arr(app.name) ? name.join(',') : app.name
    this.box = box

    // inherit if not set
    if (!app.root) app.root = box.root

    this.appConfig = new AppConfig(this).merge(app)
    this.bundlerConfig = new BundlerExtractor(this).merge(app)
    ConfigDefaulter.init(this).decorate(this.appConfig, this.bundlerConfig)

    this.setupEvents()

    // @TODO: remove this.app, use appConfig
    this.app = app
  }

  toConfig() {
    const config = this.bundlerConfig.toConfig()
    const bundler = this.bundlerConfig
    const contextChain = this.appConfig
    const presetter = new Presetter(this).merge({
      contextChain,
      config,
      bundler,
      box: this.box,
    })

    const toConfig = presetter.toConfig()

    log
      .tags('toconfig,app,context,bundler')
      .color('bold')
      .text('app-context-to-config')
      .data(this.appConfig)
      .verbose()
      .echo()

    return toConfig
  }

  // maybe should just use the flipbox one
  // and namespace the events
  //
  // however, this allows easier per context events
  // and it allows going context to box
  // for all generalized ops so clients can subscribe their own
  // such as translators on keys
  setupEvents() {
    this.evts = evts.for(this.name)
    this.emit = (a1, a2, a3, a4, a5) => {
      this.evts.emit(a1, a2, a3, a4, a5)
      this.box.evts.emit(a1, a2, a3, a4, a5)
    }
    this.on = (name, handler) => {
      this.evts.on(name, handler)
      this.box.evts.on(`${name}.${this.name}`, handler)
    }
    this.once = (name, handler) => {
      this.evts.once(name, handler)
      this.box.evts.once(`${name}.${this.name}`, handler)
    }
    this.evts.onAny((event, value) => {
      if (event == 'removeListener') {
        // console.log(arguments)
        // console._text.color.xterm('✕ ' + event + ' ' + value, 'orange')
        return
      }
      this
        .debugFor('event').color.xterm('orange')
        .text(`📢  ${event} ${this.app.name}`).echo()
    })
  }

  setup() {}
}

module.exports = AppContext
