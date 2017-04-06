// simple fluent html just currently taking in head and body
const ChainedMap = require('flipchain/ChainedMapExtendable')
const $ = require('gom')()
const {parse} = require('flip-gom-html-parser')

class HTML extends ChainedMap {
  static init() { return new HTML() }
  head(head) {
    return this.set('head', head)
  }
  scripts(scripts) {
    return this.set('scripts', scripts)
  }
  body(body) {
    return this.set('body', body)
  }
  toString() {
    const {head, body} = this.entries()
    const page = $('html', {dir: 'ltr', lang: 'en'}, [head, body])
    const doctype = `<!DOCTYPE html>\n`
    return doctype + $.render(page)
  }
}

module.exports = HTML
