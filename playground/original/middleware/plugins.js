function noop() {}

function stringReplace() {
  var StringReplacePlugin = require('string-replace-webpack-plugin')
}

function noEmitErrors(app, helpers) {
  var webpack = require('webpack')

  // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
  // ensures build does not halt
  return helpers.injectPlugins(app, new webpack.NoEmitOnErrorsPlugin())
}

// `to` is relative to the output paths
// copy our assets
function copy(app, helpers) {
  var params = app.copy
  if (!Array.isArray(params)) params = [params]
  var CopyWebpackPlugin = require('copy-webpack-plugin')
  return helpers.injectPlugins(app, new CopyWebpackPlugin(params))
}

function uglify(app, helpers) {
  // var config = app.config
  var options = app.uglify
  var webpack = require('webpack')

  // uglify our built file
  // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
  // https://github.com/mishoo/UglifyJS2/blob/master/lib/compress.js
  // https://github.com/mishoo/UglifyJS2#compressor-options
  var plugin = new webpack.optimize.UglifyJsPlugin({
    // debug: true,
    // mangle: false,
    // drop_console, drop_debugger
    report: 'gzip',
    sourceMap: options.sourcemaps || false,
    sourceMaps: options.sourcemaps || false,
    compress: true,
    minimize: true,
    output: {
      comments: false,
      screw_ie8: true,
    },
  })

  helpers.log.text('UGLIFY')
  helpers.log.verbose(plugin)

  return helpers.injectPlugins(app, plugin)
}

function loaderOptions(app, helpers) {
  var webpack = require('webpack')

  if (!app.loaderOptions) return app
  return helpers.injectPlugins(app, new webpack.LoaderOptionsPlugin(app.loaderOptions))
}

function analyze(app, helpers) {
  var webpack = require('webpack')

  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  return helpers.injectPlugins(app, new BundleAnalyzerPlugin())
}

// deletes this folder before we build so we do not have old leftovers
function clean(app, helpers) {
  if (!app.clean) return app
  var webpack = require('webpack')

  var CleanWebpackPlugin = require('clean-webpack-plugin')
  return helpers.injectPlugins(app, new CleanWebpackPlugin(app.clean))
}

// @TODO default for PRESETS, alias, loader, provide
function provide(app, helpers) {
  if (!app.provide) return app
  var webpack = require('webpack')

  return helpers.injectPlugins(app, new webpack.ProvidePlugin(app.provide))
}

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

// https://github.com/amireh/happypack/issues/53#issuecomment-226356543
// @TODO: clean up, move to loaders?
function happypack(app, helpers) {
  if (app.happypack === false) return app
  var HappyPack = require('happypack')

  var params = {
    // loaders is the only required parameter:
    loaders: app.happypack.loaders,
    verbose: app.debug.happypack,
    cache: false,
  }

  if (app.debug.happypack && app.debug.verbose) {
    params.debug = true
  }

  // only valid params
  var filtered = Object.assign({}, app.happypack)

  // if (app.debug.happypack)
  //   helpers.log(app.happypack, {level: '☺️️  🛅  🏗  happypack', verbose: false})

  // @NOTE: include is only used in loaders, not plugin
  delete filtered.include

  // merge options
  params = Object.assign(params, filtered)

  var happypacks = []
  app.happypack.loaders.forEach(loader => {
    var loaderParams = params
    var name = loader.loader || loader.loaders
    loaderParams.loaders = [loader]
    loaderParams.id = name
    happypacks.push(new HappyPack(loaderParams))
  })

  if (app.debug.happypack) {
    if (app.debug.verbose)
      helpers.log.verbose(happypacks, {level: '☺️️  🛅  🏗  happypacks'})
    else
      helpers.log(happypacks, {level: '☺️️  🛅  🏗  happypacks'})
  }

  return helpers.injectPlugins(app, happypacks)

  // single plugin, using multi ^
  // var happypackPlugin = new HappyPack(params)
  // return helpers.injectPlugins(app, happypackPlugin)
}

module.exports = {
  loaderOptions,
  copy,
  happypack,
  _noop,
  defineProduction,
  define,
  provide,
  clean,
  uglify,
  analyze,
  noEmitErrors,
}
