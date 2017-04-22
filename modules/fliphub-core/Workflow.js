const {inspectorGadget} = require('inspector-gadget')
const log = require('fliplog')
const remapBy = require('remap-by')
const Events = require('./Events')
const FilterHub = require('./FilterHub')
const PresetHub = require('./Presets')

// https://soundcloud.com/ill-gates/workflowft-the-dropstarz
class Workflow {

  /**
   * @event core.create
   * @param {Core} core
   * @param {object} coreConfig
   */
  constructor(core, coreConfig) {
    this.inspect = inspectorGadget(this, ['log', 'workflow'])
    this.log = log
    this.core = core
    this.coreConfig = coreConfig
    this.contexts = {}
    this.hubs = {
      events: new Events(this),
      preset: new PresetHub(this),
      filter: new FilterHub(this),
    }

    // @TODO: flush this out
    this.contextType = 'app'
    this.contextTypes = 'apps'

    // or should we set a filter, and use that and do `getContexts` ?
    // unfiltered? if we want to filter some per app :s ?
    this.allContexts = {}

    // add event options to the core api
    core.on = this.on
    core.evt = this.evt
    core.once = this.once
  }

  /**
   * @see fliplog.reset
   * @see this.core.reset
   * @see this.evt.reset
   */
  reset() {
    log.preset('warning').text('calling reset').echo()
    this.log.reset()

    Object.keys(this.hubs).forEach((hub) => {
      Object.keys(hub).forEach((key) => {
        if (hub[key]) {
          if (hub[key].reset) hub[key].reset()
          if (hub[key].clear) hub[key].clear()
        }
      })
    })

    delete this.core.reset
    delete this.core.ops
    delete this.core.workflow

    Object.keys(this).forEach((key) => delete this[key])
  }

  /**
   * @see this.contexts
   * @return {Array<String>}
   */
  contextNames() {
    let keys = Object.keys(this.contexts)
    if (!keys.length) keys = this.core.config.apps.map(app => app.name)
    return keys
  }

  /**
   * filter the contexts
   * @see this.contextType
   * @param {Array<string>} names
   * @return {Workflow}
   */
  filterContexts(names) {
    this.core.config[this.contextType] = this
      .core
      .config
      .apps
      .filter(type => names.includes(type.name))
    return this
  }

  /**
   * @param {Array<Context>} contexts
   * @return {Workflow}
   */
  setContexts(contexts) {
    this.contexts = remapBy(contexts, 'name')
    return this
  }

  /**
   * @param {string} name
   * @return {Workflow}
   */
  setCurrentContext(name) {
    this.current = this.contexts[name]
    this.evt.name('current.set').context().emit(this)
    return this
  }

  /**
   * @param {Function} cb
   * @return {Array<any>}
   */
  mapContexts(cb) {
    return Object
      .keys(this.contexts)
      .map((name) => cb(this.contexts[name]))
  }

  /**
   * @event context.*.any
   * @param {string} eventName
   * @return {Workflow}
   */
  emitForContexts(eventName) {
    this.mapContexts((context) => {
      this.setCurrentContext(context.name)
      // emit event: context.[name].any
      this.evt.name(eventName).context().emit(this)
    })
    return this
  }

  /**
   * @event core.create
   * @return {Workflow}
   */
  coreCreate() {
    this.evt.name('create').core().emit(this)
    return this
  }

  /**
   * @event core.init
   * @return {Workflow}
   */
  coreInit() {
    this.evt.name('init').core().emit(this)
    return this
  }

  /**
   * @event contexts.create.start
   * @event contexts.configs.start
   *
   * @event context.*.create
   * @event context.*.config.pre
   * @event context.*.config
   * @event context.*.config.post
   *
   * @event contexts.configs.done
   * @event contexts.create.done
   *
   * @factoryMethod
   * @param {Class} Context (bound by child workflow as first arg)
   * @param {Array<Object>} config
   * @return {Workflow}
   */
  contextsFrom(Context, configs) {
    this.evt
      .name('contexts.create.start').emit(this)
      .name('contexts.configs.start').emit(this)

    configs.forEach((config, i) => {
      // instantiate
      const context = new Context(this)
      // handle empty names
      context.name = config.name || i
      // add
      this.contexts[context.name] = context
      // current, for use by subscribers
      this.setCurrentContext(context.name)
      // emit event: context.[name].create
      this.evt.name('create').context().emit(this)
      // pass config
      context.preConfig(config)
      // emit event: context.[name].config
      this.evt.name('config.pre').context().emit(this)
      this.evt.name('config').context().emit(this)
      context.initConfig(config)

      this.evt.name('config.post').context().emit(this)
    })

    // emit event: context.[name].config
    this.evt
      .name('contexts.configs.done').emit(this)
      .name('contexts.create.done').emit(this)

    return this
  }

}

// coreCreate2() {
//   this.evt.name('config').core().emit(this)
//   return this
// }

// _toConfig() {
//   const chainedConfigs = this.chains.map((name) => {
//     const chain = this[name]
//     if (chain.toConfig) return chain.toConfig()
//     else throw new Error(`chain ${name} must implement toConfig`)
//   })
//
//   return this.clean(Object.assign(this.entries() || {}, {
//     plugins: this.plugins.toConfig(),
//   }))
// }

// const del = require('deep-replace/del')
// const {match} = require('deep-replace')
// @TODO: reset deep
// const test = (val) => val && typeof val === 'function'
// const decorator = ({val, prop, obj, keys, i, len}) => {
//   console.log({val, prop, obj, keys, i, len})
//   if (prop === 'on') return null
//   if (prop === 'workflow') return delete obj.workflow
//   if (prop === 'reset' || prop === 'clear') {
//     return obj[prop]()
//   }
//   return null
// }
//
// // obj, valueTest, propertyTest, decoratorFn
// match(this, test, null, decorator)

Workflow.log = log
module.exports = Workflow
