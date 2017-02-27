

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
