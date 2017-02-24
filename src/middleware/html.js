var HtmlWebpackPlugin = require('html-webpack-plugin')

// only using one for now since they all have the same file name
// then when you change a file and it breaks it tries to use the other
function htmlPluginsDir(absoluteOrRelativeDir, helpers, app) {
  var plugins = []

  // resolve if needed
  // if (!helpers.resolve.isAbsolute(dir)) {
  var dir = helpers.resolve(absoluteOrRelativeDir)

  // fs.readFileSync(fileLocation, 'utf8')
  // var htmlFiles = fs.readdirSync(dir)
  var htmlFiles = helpers.walk(dir)

  // Generates default index.html
  // uses our template as a base
  // injects our styles, scripts, etc
  htmlFiles = htmlFiles.filter(htmlFile => htmlFile.includes('.html'))

  // if (app.debug)
  //   helpers.log({htmlFiles}, {level: 'html: files'})

  // htmlFiles = [htmlFiles[0]]
  // htmlFiles = [htmlFiles.pop()]

  // @TODO: config
  var usedIndex = false

  /* eslint 'no-for-each/no-for-each': 2 */
  for (let i = 0, len = htmlFiles.length; i < len; i++) {
    var filename = htmlFiles[i]

    helpers.log(filename, {name: 'html: filename'})
    // template: helpers.resolve(dir + filename),

    // so we only do 1 index.html
    if (filename.includes('index.html')) {
      if (usedIndex) continue
      usedIndex = true
    }

    var props = {
      template: filename,
    }

    // @TODO: better detection for whether to use filename
    if (filename.split('.').length > 2) {
      props.filename = filename
    }

    var htmlPluginNextPage = new HtmlWebpackPlugin(props)
    plugins.push(htmlPluginNextPage)
  }

  return plugins
}

function htmlArrPlugins(configs, helpers, app) {
  var plugins = []
  for (let i = 0, len = configs.length; i < len; i++) {
    var config = configs[i]
    config = helpers.resolve.forKeys(config, ['filename', 'template'])
    plugins.push(new HtmlWebpackPlugin(config))
  }
  return plugins
}


// @TODO: make sure to use safety when assigning things like this
function HtmlFromSelectorPlugin(options) {
  HtmlFromSelectorPlugin.selector = options.selector
}
HtmlFromSelectorPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      var html = htmlPluginData.html.split('<body>')
      html[0] += `<body><div id="${HtmlFromSelectorPlugin.selector}"></div>`
      htmlPluginData.html = html.join('')
      callback(null, htmlPluginData)
    })
  })
}

function htmlPlugins(app, helpers) {
  var html = app.html
  if (!html) return app

  if (typeof html === 'boolean') {
    return helpers.injectPlugins(app, [
      new HtmlWebpackPlugin(),
    ])
  }


  var plugin = null
  if (typeof html === 'string') {
    // if it is a selector and is not a path
    if (html.includes('#') && !html.includes('/')) {
      return helpers.injectPlugins(app, [
        new HtmlFromSelectorPlugin({selector: html.replace('#', '')}),
        new HtmlWebpackPlugin(),
      ])
    }
    // is a path to the html file
    else {
      html = [{
        template: html,
      }]
    }
  }

  // load the files in the array
  if (Array.isArray(html))
    plugin = htmlArrPlugins(html, helpers)

  // load a whole directory
  if (html.dir)
    plugin = htmlPluginsDir(html.dir, helpers)

  // is params for html plugin
  if (!plugin)
    plugin = new HtmlWebpackPlugin(html)

  if (plugin)
    return helpers.injectPlugins(app, plugin)

  return app
}

module.exports = htmlPlugins
