
function loaderOptions(app, helpers) {
  var webpack = require('webpack')

  if (!app.loaderOptions) return app
  return helpers.injectPlugins(app, new webpack.LoaderOptionsPlugin(app.loaderOptions))
}
