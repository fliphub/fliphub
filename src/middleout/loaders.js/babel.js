const BabelLoader = {
  test: app => app.loaders.babel,
  config({app, lib, context}) {
    const babelLoaderBuilder = require('babel-loader-builder')
    let params = {
      asObject: true,
      stripFlow: true,
      async: false,
      sourceMaps: app.sourcemaps,
      plugins: [
        ['transform-runtime', {
          helpers: false,
          polyfill: false,
          regenerator: true},
        ],
      ],
    }
    params = Object.assign(app.loaders.babel)
    let config = babelLoaderBuilder(params)

    // if it uses babel.rc
    if (app.loaders.babel === true) return true
    return config
  },
}

module.exports = BabelLoader
