module.exports = function(app, helpers) {
  var babelLoaderBuilder = require('babel-loader-builder')

  var params = {
    asObject: true,
    // stringify: true,
    // react: false,
    // reactjsx: false,
    stripFlow: true,
    async: false,
    sourceMaps: app.useSourcemaps,
    plugins: [
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true},
      ],
    ],
  }

  // example, if we use presets
  if (typeof app.loaders.babel === 'object')
    params = Object.assign(params, app.loaders.babel)

  var query = babelLoaderBuilder(params)
  // loader = 'babel-loader?' + JSON.stringify(loader)
  // query = JSON.parse(query)

  var loader = {
    test: /\.js$/,
    loader: 'babel-loader',
    query,

    // http://stackoverflow.com/a/41375115
    // @TODO: default on build
    exclude: [
      /node_modules\/babel-/m,
      /node_modules\/babel-runtime/m,
      /node_modules\/core-js\//m,
      /node_modules\/regenerator-runtime\//m,
      /node_modules\/webpack-\//m,
      /node_modules\/happy-\//m,
      /node_modules\/lodash\//m,
      /node_modules\/html-\//m,
      /node_modules\/core-js\//m,
    ],
  }
  loader.exclude = /node_modules/

  if (app.debug.loaders && app.debug.loaders.babel) {
    if (app.debug.verbose || app.debug.loaders.babel === 'verbose') {
      helpers.log(loader, {level: '🗼 babel', verbose: true})
    } else {
      helpers.log(query, {level: '🗼 babel', verbose: true})
    }
  }

  if (app.loaders.babel) {
    var babelLoader = app.loaders.babel
    if (babelLoader.exclude)
      loader.exclude = babelLoader.exclude

    if (babelLoader.include)
      loader.include = babelLoader.include
    if (babelLoader.test)
      loader.test = babelLoader.test
    if (babelLoader.query)
      loader.query = babelLoader.query

    loader.query = JSON.stringify(loader.query)
  }

  return loader
}
