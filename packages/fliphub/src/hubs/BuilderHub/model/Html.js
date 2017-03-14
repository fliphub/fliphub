const computed = require('../../../lib/computed')

class Html {
  constructor({helpers, context}) {
    this.makeModel({helpers})
    // const handler = ({context, app}) => this.model.setup({context, app})
    const handler = ({app}) => {
      // console.log(Object.keys(this.model))
      // console.log(this.model.setup)
      // console._exit(this.model)
      this.model.setup(app.html)
    }
    context.evts.on('translate.html', handler)
  }

  makeModel({helpers}) {
    this.model = computed({
      file: false,
      files: [],
      configs: false, // {}
      config: false, // {}
      str: false, // {}

      sel: {
        call({forPlugin}) {
          if (forPlugin) return `<body>` + this.str
        },
        set(selector) {
          this.str = `<div id="${selector}"></div>`
        },
      },

      handleStr(html) {
        // if it is a selector and is not a path
        if (html.includes('#') && !html.includes('/'))
          this.sel = html.replace('#', '')

        // is a path to the html file
        else
          this.file = html
      },
      handleArr(html) {
        for (let i = 0, len = html.length; i < len; i++) {
          var config = html[i]
          config = helpers.resolve.forKeys(config, ['filename', 'template'])
        }
      },

      // only using one for now since they all have the same file name
      // then when you change a file and it breaks it tries to use the other
      handleDir(absoluteOrRelativeDir) {
        // resolve if needed
        // if (!helpers.resolve.isAbsolute(dir)) {
        const dir = helpers.resolve(absoluteOrRelativeDir)

        // var htmlFiles = fs.readdirSync(dir)
        let htmlFiles = helpers.walk(dir)

        // Generates default index.html
        // uses our template as a base
        // injects our styles, scripts, etc
        htmlFiles = htmlFiles.filter(htmlFile => htmlFile.includes('.html'))
        // htmlFiles = [htmlFiles[0]]
        // htmlFiles = [htmlFiles.pop()]

        // @TODO: config
        let usedIndex = false

        /* eslint 'no-for-each/no-for-each': 2 */
        for (let i = 0, len = htmlFiles.length; i < len; i++) {
          const filename = htmlFiles[i]

          console._log(filename, {level: 'html: filename'})
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
        }
      },
      setup(html) {
        if (typeof html === 'string') this.handleStr(html)

        // load the files in the array
        else if (Array.isArray(html)) this.handleArr(html)

        // load a whole directory
        else if (html.dir) this.handleDir(html.dir)

        // is params for html plugin
        else this.config = html

        return this
      },
    })
  }
}

Html.model = ({helpers, context}) => new Html({helpers, context}).model

module.exports = Html
