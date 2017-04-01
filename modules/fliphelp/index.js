// http://ternjs.net/doc/manual.html#infer
const fs = require('fs')
const {resolve} = require('path')


const file = resolve(__dirname, './test.js')
const contents = fs.readFileSync(file, 'utf8')

const infer = require('tern/lib/infer')

const ctx = new infer.Context()
console.log({ctx})

const aval = new infer.AVal()
console.log({aval})

const parsed = infer.parse(contents)
console.log({parsed})

const analyzed = infer.analyze(parsed)
console.log({analyzed})

// http://www.mattzeunert.com/2016/06/10/analyzing-variable-references-with-tern-js.html

// const parsed = infer.parse(contents)
// console.log(infer)
// const analyzed = infer.analyze(parsed)
// console.log(analyzed)
//
//
// // const cx = infer.cx()
//
// const tern = require('tern')

// const ternExpress = require('tern-node-express')
// tern.plugins({
//   node: null,
// })

// console.log(ternExpress)

// const server = tern.Server(tern.defaultOptions)
// console.log({server})

// const parsed = server.addFile(file)
// console.log(parsed)
