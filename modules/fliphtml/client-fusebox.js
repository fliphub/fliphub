// @TODO: public paths of files
const {Sparky} = require('fuse-box')
const execa = require('execa')
const gom = require('gom')
const {parse} = require('flip-gom-html-parser')
const log = require('fliplog')
const {read} = require('flipfile')

// flipcache seems better
// just needs support for array, glob
const $ = gom()

const headContent = [
  $('meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}),
]
const head = $('head', {}, headContent)
const body = $('body', {}, [
  $('script', {id: 'web-font-loader'}, 'const ewan = eval(1)'),
])

let page = $('html', {dir: 'ltr', lang: 'en'}, [head, body])
let doctype = `<!DOCTYPE html>\n`
let html = doctype + $.render(page)

console.log(page)
console.log(html)
console.log(parse(html))

// use json-chain?
// Sparky.task('copy', () => {
//   return Sparky
//     // .src('*.html + *.js')
//     .file('*.html', file => {
//       const contents = read(file.filepath)
//       const parsed = parse(contents)
//       log.quick(parsed)
//     })
//     .dest('backup/')
// })
//
// Sparky.task('default', ['copy'], () => {})
