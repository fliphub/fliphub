const computed = require('../../../lib/computed')

// so when we do adapt,
// that means the translation
// should already have happened taking `loaders` from `app`...
// which is kind of what the eventemitting does tho
// interface Adapter {
//   files: Array<string>,
//   name: string,
//   // test: /^.$/,
//   //
//   // adaptLoader:
//   // adaptPlugin:
//   // type? could be `plugin`, `loader`, `get`/all?
//   // ^ or it could auto call fns for that...
//   //
//   // adapt: (config) => eh,
// }

// options specifically for bundler like
// include exclude etc? options?

// and fusebox has additional random flat props...
// like limit2project...
// group: "app.css",
// outFile: `${tmp}/app.css`

// interface FuseBoxLoaderParams {
//   limit2project?: Bool,
//   group?: String,
//   outFile?: String,
//   // ...
// } | Array<FuseBoxLoaderSchema>

// type Condition = RegExp | String | Function | Array<LoaderParams.test> | Object<LoaderParams.test>
// interface LoaderParams {
//   condition: {
//     test: Condition,
//     exclude: Condition,
//     include: Condition,
//
//       and: Condition,
//       or: Condition,
//       not: Condition,
//   },
//
//   // use: 'babel-loader'
//   // loader: 'babel-loader'
//   // use: ['babel-loader']
//   // use: [{loader: 'babel-loader'}]
//   loader: String | Array<String>,
//
//   enforce: Enum["pre", "post"]
//   parser:
//
//   // query:
//   options: {
//
//   },
// }

class LoaderSettings {
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
      condition, test, include, exclude, ignore,
      rules, enforce,
      use, loader,
      options, query, config,
    } = raw
    if (config) this.config = config
  }
}

class Processors {
  constructor(args) {
    this.inspect = inspectorGadget(this)
    this.args = args
    this.makeModel()
    const {context, app, box} = args
    const matched = []

    // context.once('loader.*', (name, config) => this.setupLoaders())
    // context.once('loadersDone', () => this.loadersDone(args)

    const handler = (name, settings) => {
      if (matched.includes(name)) return
      matched.push(name)
      context.debugFor('loaders', '⚖️  loader added', 'yellow', {name, settings})

      const loaderSettings = new LoaderSettings(settings)
      loaderSettings.appExtract({app})

      this.model.handle({name, settings: loaderSettings, context, app, box})
    }
    const fileHandler = (name, file) => {
      if (matched.includes(name)) return
      matched.push(name)
      this.model.handleFileType(file)
    }

    // makes me think we need an adapter hub
    // !!! pluginhub could be adapterhub...
    const adapterHandler = (name, adapter) => {
      context.debugFor(['loaders', 'adapter'], '⚖️  adapter added', 'green', name)
      this.model.addAdapter(name, adapter)
    }

    context.evts.on('adapter.loader.*', adapterHandler)
    context.evts.on('translate.loader.*', handler)
    // context.evts.on('translate.loader:file.*', fileHandler)
  }

  makeModel() {
    this.model = computed({
      // data

      // ## translators / config handlers
      handlers: {},

      // ## loader loadersSettings
      // - all adapted in `get` for the bundler by adapters.adaptAll
      // - adapted by adapters.loadersSettings when adding
      loadersSettings: {},

      // ## loader loadersSettings adapters
      adapters: {
        loadersSettings: {},

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

      // adapterKeys: {
      //   config: [],
      //   loader: [],
      //   loaders: [],
      // },

      // - loader options - plugin
      // options: {},

      // adding
      // addSettings(name, settings) {
      //   this.loadersSettings[name] = settings
      // },
      addHandler(name, maker) {
        this.handlers[name] = maker
      },
      addAdapter(name, adapter) {
        // console.exit(name, adapter)
        this.adapters.loadersSettings[name] = adapter
        // if (adapter.adapt) this.adapters.adapt[name] = adapter
        if (adapter.adaptAll) this.adapters.adaptAll.push(adapter)
      },

      // getting
      has(name) { return !!this.loadersSettings[name] },
      forName() {},

      // create... instantiate... make...
      // if we don't have anything special, is like `raw`
      handle(args) {
        const {name, settings} = args
        // const {config} = other
        // console.exit(name, other)
        // console.exit(box.hubs.getHub('PluginHub').configFor(args))

        const adapterFor = this.adapters.loadersSettings[name]
        if (adapterFor) {
          this.loadersSettings[name] = adapterFor.adapt({settings})
          // console.exit(name, config, this.adapters, this.adapters.config[name])
        } else {
          this.loadersSettings[name] = settings
        }
      },

      handleFileType(name) {
        // go through handlers
        // check if they have file supported handler
        // ensure the user can set these options...

        // if (files[file]) this.add({name: files[file], context, box})
        // return this
      },

      // should have adapters for these...
      // would be a perfect case for using happypack!!!
      // asRules() {},
      get() {
        const bundlerAdapters = this.adapters.adaptAll
        // could use an adapter with `get` name...
        if (bundlerAdapters) {
          let val = this.loadersSettings
          bundlerAdapters.forEach(adapter => val = adapter.adaptAll(val))
          return val
          // console.exit(name, other, this.adapters[name])
        } else {
          return Object.values(this.loadersSettings)
        }
      },

      getLoaderOptions() {},
      getAdapter(name) {},
    })
  }
}

Processors.model = (args) => new Processors(args).model

module.exports = Processors
