var tosource = require('tosource')
var loaders = []

// @TODO: async node target
// https://github.com/webpack/docs/issues/45
// https://github.com/knpwrs/webpack-to-memory
// https://github.com/shama/webpack-stream
module.exports = function(app, helpers) {
  var params = app.params

  // @TODO:
  // http://stackoverflow.com/questions/32874025/how-to-add-wildcard-mapping-in-entry-of-webpack
  // wildcard entrypoint

  // so it can be just a string
  if (app.entry) {
    params = {
      entry: app.entry,
    }
    // if we did some decorating
    if (app.params) {
      Object.assign(params, app.params)
    } else {
      app.params = params
    }
  }

  var defaults = {
    target: 'web',
  }
  var fig = Object.assign(defaults, params)
  var {entry, target, output} = fig

  if (typeof entry === 'string')
    entry = helpers.resolve(entry)

  // @TODO: array of file entries
  if (!output) {
    var paths, filename
    // eg: {demo: eh, canada: moose}
    if (typeof entry !== 'string') {
      filename = paths = Object.keys(entry)[0]
    }
    else {
      paths = entry.split('/')
      filename = paths.pop()
    }


     // @TODO: more support
    if (!filename.includes('.js')) filename = filename + `.js`
    output = {
      filename,
      path: helpers.resolve('./dist'),
      // files are accessible relatively with this path
      publicPath: '/',
    }
    if (target === 'node') {
      output.libraryTarget = 'commonjs2'
    }

    // console.log({output}, 'config_builder')
  } else {
    if (output.path) output.path = helpers.resolve(output.path)
  }

  if (app.outFile) {
    if (helpers.file.isFile(app.outFile)) {
      output.path = helpers.resolve('./dist')
      output.filename = app.outFile
    } else {
      var {file, path} = helpers.file.getFileAndPath(app.outFile)
      output.path = helpers.resolve(path)
      output.filename = file
    }
  } else {
    // app.outFile = helpers.get
  }


  if (!app.entry) app.entry = entry

  var config = {
    target,
    devtool: app.sourceMapTool || '#source-map',
    entry,
    output,
    module: {
      loaders,
    },
    resolve: {alias: {}},
    plugins: [],
  }

  // @TODO: these debug things should be in init?
  if (app.debug && app.debug.params)
    helpers.log(tosource(config), {level: '🛠 builder_config_tosource', color: 'green'})

  app.webpack = config
  return app
}
