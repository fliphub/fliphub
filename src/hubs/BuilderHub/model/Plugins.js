const computed = require('../../../lib/computed')

class PluginSettings {
  appExtract({app}) {
    // if (app.)
  }

  set(settings) {
    this.settings = settings
  }

  get() {
    return this.settings
  }

  constructor(raw) {
    this.settings = raw
    this.raw = raw || {}

    if (typeof raw !== 'object') return
    const {
      options, config,
    } = raw
    if (config) this.config = config
  }
}

class Plugins {
  constructor(args) {
    this.inspect = inspectorGadget(this)
    this.args = args
    this.makeModel()
    const {context, app, box} = args
    const matched = []
  }

  makeModel() {
    this.model = computed({
      // data

      // ## translators / config handlers
      handlers: {},

      // ## loader pluginSettings
      // - all adapted in `get` for the bundler by adapters.adaptAll
      // - adapted by adapters.pluginSettings when adding
      pluginSettings: {},

      // ## loader pluginSettings adapters
      adapters: {
        pluginSettings: {},

        // loader: {},
        adaptAll: [],

        // now it gets tricky
        // when we already have an adapter for a loader config
        // and we add a file
        // OR
        // when we do not have one,
        // and do not have a config
        // OR
        // we do have one,
        // and do not have a config
        // files: {},
      },

      addHandler(name, maker) {
        this.handlers[name] = maker
      },
      addAdapter(name, adapter) {
        // console.exit(name, adapter)
        this.adapters.pluginSettings[name] = adapter
        // if (adapter.adapt) this.adapters.adapt[name] = adapter
        if (adapter.adaptAll) this.adapters.adaptAll.push(adapter)
      },

      // getting
      has(name) { return !!this.pluginSettings[name] },
      forName() {},

      // create... instantiate... make...
      // if we don't have anything special, is like `raw`
      handle(args) {
        const {name, settings} = args
        // const {config} = other
        // console.exit(name, other)
        // console.exit(box.hubs.getHub('PluginHub').configFor(args))

        const adapterFor = this.adapters.pluginSettings[name]
        if (adapterFor) {
          this.pluginSettings[name] = adapterFor.adapt({settings})
          // console.exit(name, config, this.adapters, this.adapters.config[name])
        } else {
          this.pluginSettings[name] = settings
        }
      },

      // should have adapters for these...
      // would be a perfect case for using happypack!!!
      // asRules() {},
      get() {
        const bundlerAdapters = this.adapters.adaptAll
        // could use an adapter with `get` name...
        if (bundlerAdapters.length) {
          let val = this.pluginSettings
          bundlerAdapters.forEach(adapter => val = adapter.adaptAll(val))
          return val
        } else {
          return Object.values(this.pluginSettings)
        }
      },

      getAdapter(name) {},
    })
  }
}

Plugins.model = (args) => new Plugins(args).model

module.exports = Plugins
