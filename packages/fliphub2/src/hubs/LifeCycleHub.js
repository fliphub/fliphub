// const FlagHub = require('./FlagHub/FlagHub')
// const EnvHub = require('./FlagHub/EnvHub')
// const PresetsHub = require('./PresetHub/PresetHub')
// const BundlerHub = require('./BundlerHub/BundlerHub')
// const OpsHub = require('./OpsHub/OpsHub')
// const BuilderHub = require('./BuilderHub/BuilderHub')
// const PluginHub = require('./PluginHub/PluginHub')
// const TranslatorHub = require('./TranslatorHub/TranslatorHub')
const FilterHub = require('./FilterHub')
const {inspectorGadget} = require('inspector-gadget')

// now we still have the `order` issue?
const hubs = [
  // BundlerHub,
  // BuilderHub,
  FilterHub,

  // DefaultsHub,
  // PresetsHub,
  // FlagHub, EnvHub, PluginHub,
  // TranslatorHub,

  // OpsHub,
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
    const {context} = args
    context.debugFor('app-init-called').text('app init called ' + args.context.name)

    // for (let i in this.hubs) this.hubs[i].setupAppInit(args)
    // context.emit('appInit', args)
  }
  appBuild(args) {
    const {context} = args
    context.debugFor('build-called').text('app build called ' + args.context.name)

    // const {context} = args
    // context.emit('appDefaults', args)
    // context.emit('appBuild', args)
    // context.emit('appBuilt', args)
    // context.debugFor('whitespace')
    //   .text('\n--------------------------------------------------\n')
    //   .color('bold').time(false).echo()
  }
}

module.exports = LifeCycleHub
