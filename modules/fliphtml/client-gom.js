const HTMLs = require('./index')
const HTML = require('./HTML')

const htmls = new HTMLs()


// htmls.add(contents, files, cb)
// htmls.add('', [], () => {})

// flipcache seems better
// just needs support for array, glob
const $ = require('gom')()

const headContent = [
  $('meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}),
]
const head = $('head', {}, headContent)
const body = $('body', {}, [
  $('script', {id: 'web-font-loader'}, 'const ewan = eval(1)'),
])

console.log(HTML.init().head(head).body(body).toString())
