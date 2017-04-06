// https://github.com/sindresorhus/awesome-nodejs#documentation
// [fliphub-core]: https://www.npmjs.com/package/fliphub-core
//
// # 🕵🗜🔎 inspector-gadget
const parse = require('markdown-to-ast').parse
const read = require('flipfile/read')
const globfs = require('flipfile/glob')()
const pattern = './packages/**/REAMDE.md'
// +(packages|modules|modules-sub)
let readmes = []

function globToAbs(file) {
  // console.log(file.name, file.extname, file.path)
  if (file && file.name === 'README' && file.extname === '.md')
    readmes.push(read(file.path))
  return file
}
const files = globfs.use(globToAbs).readdirSync(pattern)
// files.forEach(file => {
//   readmes.push(read(read))
// })
// console.log(readmes)
readmes.forEach(readme => {
  var AST = parse(readme)
  console.log(AST)
})
