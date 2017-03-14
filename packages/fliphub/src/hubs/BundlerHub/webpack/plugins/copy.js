// `to` is relative to the output paths
// copy our assets
function copy(app, helpers) {
  var params = app.copy
  if (!Array.isArray(params)) params = [params]
  var CopyWebpackPlugin = require('copy-webpack-plugin')
  return helpers.injectPlugins(app, new CopyWebpackPlugin(params))
}
