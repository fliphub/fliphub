// only use base config if they have one
// otherwise build with params
module.exports = function(app, helpers) {
  var webpackConfig = require(helpers.resolve(app.config))
  app.webpack = webpackConfig
  if (webpackConfig.module && webpackConfig.module.loaders)
    app.loaders = webpackConfig.module.loaders
  return app
}
