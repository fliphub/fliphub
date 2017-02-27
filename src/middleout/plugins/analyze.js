
function analyze(app, helpers) {
  var webpack = require('webpack')

  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  return helpers.injectPlugins(app, new BundleAnalyzerPlugin())
}
