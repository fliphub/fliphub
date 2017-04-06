const HtmlWebpackPlugin = require('html-webpack-plugin')
const log = require('fliplog')
const gom = require('gom')
const {walk, isRel} = require('flipfile')
const resolve = require('fliphub-resolve')

class HtmlPlugin {

}

// @TODO: output to file,
// - static serving html for all html files
// - dev serving all html files with reload


// https://github.com/the-grid/gom/blob/master/spec/GOM.coffee#L189
class Html {
  getSel() {
    return `<body>` + this.str
  }
  selector(selector) {
    this.str = `<div id="${selector}"></div>`
  }
  constructor() {
    Object.assign(this, {
      file: false,
      files: [],
      configs: false,
      config: false,
      str: false}
    )
  }
  handleStr(html) {
    // if it is a selector and is not a path
    if (html.includes('#') && !html.includes('/'))
      this.selector(html.replace('#', ''))

    // is a path to the html file
    else
      this.file = html
  }
  handleArr(html) {
    for (let i = 0, len = html.length; i < len; i++) {
      let config = html[i]
      config = resolve.forKeys(config, ['filename', 'template'])
    }
  }

  // only using one for now since they all have the same file name
  // then when you change a file and it breaks it tries to use the other
  handleDir(absoluteOrRelativeDir) {
    // resolve if needed
    let dir = absoluteOrRelativeDir
    if (!isRel(dir)) dir = resolve(dir)

    // var htmlFiles = fs.readdirSync(dir)
    let htmlFiles = walk(dir)

    // Generates default index.html
    // uses our template as a base
    // injects our styles, scripts, etc
    htmlFiles = htmlFiles.filter((htmlFile) => htmlFile.includes('.html'))
    // htmlFiles = [htmlFiles[0]], [htmlFiles.pop()]

    // @TODO: config
    let usedIndex = false

    /* eslint 'no-for-each/no-for-each': 2 */
    for (let i = 0, len = htmlFiles.length; i < len; i++) {
      const filename = htmlFiles[i]

      log
        .tags('filename,html,preset,args')
        .text('html: filename')
        .data(filename)
        .echo()

      // template: helpers.resolve(dir + filename),
      // so we only do 1 index.html
      if (filename.includes('index.html')) {
        if (usedIndex) continue
        usedIndex = true
      }

      const props = {template: filename}

      // @TODO: better detection for whether to use filename
      if (filename.split('.').length > 2) props.filename = filename
      this.files.push(props)

      // let htmlPluginNextPage = new HtmlWebpackPlugin(props)
      // plugins.push(htmlPluginNextPage)
    }
  }

  setup(html) {
    if (typeof html === 'string') this.handleStr(html)

    // load the files in the array
    else if (Array.isArray(html)) this.handleArr(html)

    // load a whole directory
    else if (html.dir) this.handleDir(html.dir)

    // is params for html plugin
    else this.config = html

    return this
  }
}

function htmlPluginsDir(absoluteOrRelativeDir, helpers, app) {
  let plugins = []

  // resolve if needed
  // if (!helpers.resolve.isAbsolute(dir)) {
  let dir = helpers.resolve(absoluteOrRelativeDir)

  // fs.readFileSync(fileLocation, 'utf8')
  // var htmlFiles = fs.readdirSync(dir)
  let htmlFiles = helpers.walk(dir)

  // Generates default index.html
  // uses our template as a base
  // injects our styles, scripts, etc
  htmlFiles = htmlFiles.filter((htmlFile) => htmlFile.includes('.html'))

  // if (app.debug)
  //   helpers.log({htmlFiles}, {level: 'html: files'})

  // htmlFiles = [htmlFiles[0]]
  // htmlFiles = [htmlFiles.pop()]

  // @TODO: config
  let usedIndex = false

  /* eslint 'no-for-each/no-for-each': 2 */
  for (let i = 0, len = htmlFiles.length; i < len; i++) {
    let filename = htmlFiles[i]

    helpers.log(filename, {name: 'html: filename'})
    // template: helpers.resolve(dir + filename),

    // so we only do 1 index.html
    if (filename.includes('index.html')) {
      if (usedIndex) continue
      usedIndex = true
    }

    let props = {
      template: filename,
    }

    // @TODO: better detection for whether to use filename
    if (filename.split('.').length > 2) {
      props.filename = filename
    }

    let htmlPluginNextPage = new HtmlWebpackPlugin(props)
    plugins.push(htmlPluginNextPage)
  }

  return plugins
}

function htmlArrPlugins(configs, helpers, app) {
  let plugins = []
  for (let i = 0, len = configs.length; i < len; i++) {
    let config = configs[i]
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
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
      let html = htmlPluginData.html.split('<body>')
      html[0] += `<body><div id="${HtmlFromSelectorPlugin.selector}"></div>`
      htmlPluginData.html = html.join('')
      callback(null, htmlPluginData)
    })
  })
}

function htmlPlugins(app, helpers) {
  let html = app.html
  if (!html) return app

  if (typeof html === 'boolean') {
    return [
      new HtmlWebpackPlugin(),
    ]
  }


  let plugin = null
  if (typeof html === 'string') {
    // if it is a selector and is not a path
    if (html.includes('#') && !html.includes('/')) {
      return [
        new HtmlFromSelectorPlugin({selector: html.replace('#', '')}),
        new HtmlWebpackPlugin(),
      ]
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
    throw new Error(plugin, 'todo, was inject plugin')
}


module.exports = htmlPlugins
