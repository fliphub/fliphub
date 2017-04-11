// simple fluent html just currently taking in head and body
const ChainedMap = require('flipchain/ChainedMapExtendable')
const $ = require('gom')()
const {parse} = require('flip-gom-html-parser')

class HTMLChain extends ChainedMap {
  static init() { return new HTMLChain() }
  constructor(parent) {
    super(parent)
    this.set('scripts', [])
    this.set('bodyScripts', [])
    this.set('headScripts', [])
  }
  head(props, content) {
    return this.set('head', {props, content})
  }

  // make it better...
  script(src, props = {body: true}) {
    const script = [$('script', props, src)]
    if (props.body)
      return this.set('bodyScripts', this.get('bodyScripts').concat(script))
    else
      return this.set('headScripts', this.get('headScripts').concat(script))
  }

  body(props, content) {
    return this.set('body', {props, content})
  }
  toString() {
    let {head, body, bodyScripts, headScripts} = this.entries()

    bodyScripts = bodyScripts || []

    const headEl = $('head', head || {}, [
      head,
      // ...head,
      // ...
    ])
    const bodyEl = $('body', body.props || {}, [
      body.content || null,
      ...bodyScripts,
    ])

    const page = $('html', {dir: 'ltr', lang: 'en'}, [headEl, bodyEl])
    const doctype = `<!DOCTYPE html>\n`
    return doctype + $.render(page)
  }

  assets() {
    console.log('assets todo')
    return this
  }
  html() {
    this.contents += 'html'
    return this
  }
}

module.exports = HTMLChain
