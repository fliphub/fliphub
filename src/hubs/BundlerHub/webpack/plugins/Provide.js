// @TODO default for PRESETS, alias, loader, provide
module.exports = function provide(app, helpers) {
  if (!app.provide) return app
  var webpack = require('webpack')

  return helpers.injectPlugins(app, new webpack.ProvidePlugin(app.provide))
}
