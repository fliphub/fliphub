
// deletes this folder before we build so we do not have old leftovers
function clean(app, helpers) {
  if (!app.clean) return app
  var webpack = require('webpack')

  var CleanWebpackPlugin = require('clean-webpack-plugin')
  return helpers.injectPlugins(app, new CleanWebpackPlugin(app.clean))
}
