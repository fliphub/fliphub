const log = require('fliplog')
const {walk, isRel} = require('flipfile')
const resolve = require('fliphub-resolve')
const gom = require('gom')

// @TODO: output to file,
// - static serving html for all html files
// - dev serving all html files with reload


// https://github.com/the-grid/gom/blob/master/spec/GOM.coffee#L189
class HTML {
  from(cb) {
    const args = cb(gom, files)
    this.setup(args)
  }

  // fusebox, webpack...
  to() {
    // this.configs
    // let htmlPluginNextPage = new HtmlWebpackPlugin(props)
    // plugins.push(htmlPluginNextPage)

    // this.selector
    // new HtmlFromSelectorPlugin({selector: html.replace('#', '')}),
    // new HtmlWebpackPlugin(config)
    // new HtmlFuseBoxPlugin
  }

  setSelector(selector) {
    this.str = `<div id="${selector}"></div>`
  }
  constructor() {
    Object.assign(this, {
      file: false,
      files: [],
      configs: [],
      config: false,
      str: false,
    })
  }
  handleStr(html) {
    // if it is a selector and is not a path
    if (html.includes('#') && !html.includes('/'))
      this.setSelector(html.replace('#', ''))

    // is a path to the html file
    else
      this.file = html
  }
  handleArr(html) {
    for (let i = 0, len = html.length; i < len; i++) {
      let config = html[i]
      config = resolve.forKeys(config, ['filename', 'template'])
      this.configs.push(config)
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
      this.configs.push(props)
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

module.exports = HTML
