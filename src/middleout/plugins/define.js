function noop() {}

// @TODO only 1 define plugin
function define(app, helpers) {
  var webpack = require('webpack')

  return helpers.injectPlugins(app, new webpack.DefinePlugin(app.define))
}


// abstract define? array?
function defineProduction(app, helpers) {
  var webpack = require('webpack')

  // https://github.com/webpack/docs/wiki/list-of-plugins#dedupeplugin
  // remove duplication!
  // new webpack.optimize.DedupePlugin(),
  process.env.NODE_ENV = 'production'

  // ensure node_env === production in our src
  var prod = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
  return helpers.injectPlugins(app, prod)
}



function _noop(app, helpers) {
  var webpack = require('webpack')

  return helpers.injectPlugins(app, new webpack.DefinePlugin({'_noop': noop}))
}
