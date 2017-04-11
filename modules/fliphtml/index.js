const log = require('fliplog')
const {walk, isRel} = require('flipfile')
const resolve = require('fliphub-resolve')
const gom = require('gom')
const parser = require('flip-gom-html-parser')
const flipcache = require('flipcache')
const Tasks = require('./tasks')
const HTMLChain = require('./HTML')

// @TODO: output to file,
// - static serving html for all html files
// - dev serving all html files with reload


// @TODO: fluent json
class HTML {
  constructor(contents = '', cb) {
    this.cb = cb
    this.contents = contents
  }
  onComplete(args) {
    this.cb(this.edit(), args)
  }
  edit() {
    return parser(this.contents)
  }
}

// https://github.com/the-grid/gom/blob/master/spec/GOM.coffee#L189
class HTMLs {
  add(name) {
    // const h = new HTML(this)
    const h = new HTMLChain(this)
    h.add = this.add.bind(this)

    this.htmls.push(h)

    return h
  }

  // needs to subscribe to html webpack, or fusebox, and then call the callback
  // with the gom html
  do(contents, files, cb) {
    this.htmls.push(new HTML(contents, cb))
    this.tasks.push(new Tasks(files))
    return this
  }

  // --------------

  from(cb) {
    const args = cb(this.files)
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
    return this
  }
  constructor() {
    Object.assign(this, {
      htmls: [],
      tasks: [],

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

    return this
  }
  handleArr(html) {
    for (let i = 0, len = html.length; i < len; i++) {
      let config = html[i]
      config = resolve.forKeys(config, ['filename', 'template'])
      this.configs.push(config)
    }
    return this
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

    return this
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

HTMLs.$ = gom()
HTMLs.HTMLs = HTMLs
module.exports = HTMLs
