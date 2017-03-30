const plugins = require('../plugins')

// https://github.com/webpack/webpack/blob/3afd802c9a5a22ee42bb2395307ce50dbbd3a3aa/lib/WebpackOptionsDefaulter.js
class WebPackTranslator {
  // @TODO: @NOTE: is more like defaults
  translate({app, helpers, context}) {
    context.debugFor('builder', '🛅  builder is webpack', 'green')
    const {builder} = context
    builder.name = 'webpack'

    // builder.rules = {}
    // builder.loaders = []
    // builder.loaderKeys = []
    // builder.plugins = []

    // if (app.loaderOptions) builder.set('loaderOptions', app.loaderOptions)
    if (app.loaderOptions) builder.loaderOptions = app.loaderOptions

    global._timer.start('webpack')
    // @TODO: needs to be moved to webpack folder
    global.webpk = global.webpk || require('webpack')
    builder.api = global.webpk
    global._timer.stop('webpack').log('webpack')
    return this
  }
  init(args) {
    const {app, helpers, context, box} = args
    this.app = app
    this.helpers = helpers
    this.context = context
    context.once('alias', () => this.alias({context}))
    plugins.init(args)
    this.setupLoaders(args)
    return this
  }
  alias({context}) {
    require('../adapters/alias').decorate({context})
  }
  setupLoaders(args) {
    const WebPackLoaders = require('../loaders')
    this.loaderTranslator = new WebPackLoaders(args)
  }
}

module.exports = WebPackTranslator
