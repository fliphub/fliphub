// http://ternjs.net/doc/manual.html#infer
const fs = require('fs')
const {resolve} = require('path')
const file = resolve(__dirname, './test.js')
const contents = fs.readFileSync(file, 'utf8')

const tern = require('tern')
let ternServer = new tern.Server({})
ternServer.addFile('example.js', 'var a = 5; a += 10;')
ternServer.addFile('ugh.js', contents)

let requestDetails = {
  // query: {
  //   type: 'refs',
  //   file: 'example.js',
  //   end: 5,
  //   properties: true,
  // },
  query: {
    type: 'refs',
    // file: 'example.js',
    file: 'ugh.js',
    end: 20,
    properties: {},
  },
}
ternServer.request(requestDetails, (error, success) => {
  console.log(success)
})
