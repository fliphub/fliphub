class LoaderBundleConfigAdapter {
  adaptAll(settings) {
    return Object.values(settings)
  }
}

// @TODO:
//  - [ ] abstract translator with init that adds to instance
//        or decorator
//
//  - [ ] auto connects all methods to listeners
class FuseBoxTranslator {
  constructor(args) {
  }
  // @TODO: @NOTE: is more like defaults
  translate({context}) {
    const {builder} = context
    builder.name = 'fusebox'
    // builder.loaders = []
    builder.plugins = []

    global._timer.start('fsbx')
    // @TODO: needs to be moved to fusebox folder
    global.fsbx = global.fsbx || require('fsbx')
    builder.api = global.fsbx
    global._timer.stop('fsbx').log('fsbx')

    // context.builder.instance = undefined
    context.debugFor('builder', '💣  builder is fusebox', 'green')
    return this
  }

  init(args) {
    const {app, helpers, context, box} = args
    this.app = app
    this.helpers = helpers
    this.context = context
    context.evts.once('translate.alias', () => this.alias(context))
    this.setupAdapters(args)

    // const matched = []
    // context.evts.on('translate.loader.*', (name, config) => {
    //   if (matched.includes(name)) return
    //   matched.push(name)
    //
    //   this.loaders({name, config, context, box})
    // })
    // context.evts.on('translate.loader:file.*', (file, config) => {
    //   if (matched.includes(name)) return
    //   this.loadersForFile({file, config, context, box})
    // })

    return this
  }
  alias(context) {
    require('./alias').decorate({context})
  }
  setupAdapters({context, helpers}) {
    const {builder} = context
    const {initClassOrObj} = helpers
    const keyVal = {
      'babel': 'BabelPlugin',
      'typescript': 'TypeScriptHelpers',
      'uglify': 'UglifyJSPlugin',
      'coffee': 'CoffeePlugin',
      'html': 'HTMLPlugin',
      'svg': 'SVGPlugin',
      'json': 'JSONPlugin',
      'env': 'EnvPlugin',
    }

    const adapters = {}
    Object.keys(keyVal).forEach(key => {
      adapters[key] = {
        adapt({settings}) {
          let plugin = keyVal[key]
          plugin = builder.api[plugin]
          // if (name === 'babel' && !settings.config) loader = {config: settings}
          // else {
          // if (plugin) settings.set(plugin(settings))
          if (settings.set) settings.set(plugin(settings))
          return plugin(settings)
          // }
        },
      }
    })
    adapters[LoaderBundleConfigAdapter.name] = new LoaderBundleConfigAdapter()

    Object.keys(adapters).forEach(name => {
      const adapter = initClassOrObj(adapters[name])
      builder.loaders.addAdapter(name, adapter)
    })
  }
}

module.exports = FuseBoxTranslator
