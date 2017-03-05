// @TODO:
// test if they already have a babelrc automatically
// typescript checks for tsconfig so
const BabelLoader = {
  name: 'BabelLoaderHandler',
  test: app => app.loaders && app.loaders.babel,
  configure({app, context, adapter}) {
    // const babelLoaderBuilder = require('babel-loader-builder')
    const babelLoaderBuilder = require('./babel-builder')
    let params = {
      asObject: true,
      stripFlow: true,
      async: false,
      sourceMaps: app.sourcemaps,
      // plugins: [
      //   ['transform-runtime', {
      //     helpers: false,
      //     polyfill: false,
      //     regenerator: true},
      //   ],
      // ],
    }
    console.exit()
    if (adapter && adapter.params) params = adapter.params(params)

    // @TODO:
    // - [ ] if it has query...
    // - [ ] this will not work...
    if (app.loaders && app.loaders.babel)
      params = Object.assign(params, app.loaders.babel)

    // if it uses babel.rc
    if (app.loaders && app.loaders.babel === 'babelrc')
      return true

    let config = babelLoaderBuilder(params)
    if (adapter && adapter.config) config = adapter.config(config)

    // context.builder.plugins['babel'] = config
    return config
  },
}

module.exports = BabelLoader
