const AbstractHub = require('./AbstractHub')
const DefaultsHub = require('./DefaultHub/DefaultHub')
const FlagHub = require('./FlagHub/FlagHub')
const EnvHub = require('./FlagHub/EnvHub')
const PresetsHub = require('./PresetHub/PresetHub')
const TranslatorHub = require('./TranslatorHub/TranslatorHub')
const BundlerHub = require('./BundlerHub/BundlerHub')
const OpsHub = require('./OpsHub/OpsHub')
const BuilderHub = require('./BuilderHub/BuilderHub')
const PluginHub = require('./PluginHub/PluginHub')
const FilterHub = require('./FilterHub')

// now we still have the `order` issue?
const hubs = [
  BundlerHub, BuilderHub, FilterHub,

  DefaultsHub, PresetsHub,
  FlagHub, EnvHub, PluginHub,
  // EnvHub, FlagHub,
  TranslatorHub,

  OpsHub,
]

class LifeCycleHub {
  // or just remove subscriber
  constructor(box) {
    this.box = box
    this.helpers = box.helpers
    this.inspect = inspectorGadget(this, ['box', 'app', 'context', 'args', 'hubArr'])
    this.hubs = {}
    this.args = {}

    this.boxInit({box, helpers: this.helpers})
  }
  getHub(name) {
    return this.hubs[name]
  }
  boxInit({box}) {
    // decorate
    box.getHub = (name) => this.getHub(name)

    // instantiate
    hubs.forEach(Hub => this.hubs[Hub.name] = new Hub(box))
  }

  appInit(args) {
    // console.debug('app init called')
    console.log('app init called ' + args.context.name)

    const {context, app, helpers, box} = args
    Object.values(this.hubs).forEach(hub => hub.setupAppInit(args))
    context.emit('appInit', args)
  }
  appBuild(args) {
    // console.debug('app build called')
    console.log('app build called ' + args.context.name)


    const {context, app, helpers, box} = args
    context.emit('appDefaults', args)
    context.emit('appBuild', args)
    context.emit('appBuilt', args)
    context.debugFor('whitespace',
      '\n--------------------------------------------------\n',
      {color: 'bold', text: true, time: false})
  }
}

module.exports = LifeCycleHub
