// uglify our built file
// https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
// https://github.com/mishoo/UglifyJS2/blob/master/lib/compress.js
// https://github.com/mishoo/UglifyJS2#compressor-options
const Uglify = {
  name: 'uglify',
  on: 'uglify',
  handle({app, context, builder, helpers}) {
    const options = app.uglify || context.uglify

    let params = {
      // debug: true,
      // mangle: false,
      // drop_console, drop_debugger
      report: 'gzip',
      sourceMap: builder.sourcemaps.use,
      compress: true,
      minimize: true,
      output: {
        comments: false,
        screw_ie8: true,
      },
    }

    console.exit(helpers.utils)
    if (helpers.utils.isObject(options)) {
      params = options
    }

    const plugin = new builder.api.optimize.UglifyJsPlugin(params)
    builder.plugins.add(plugin)
    return plugin
  },
}

module.exports = Uglify
