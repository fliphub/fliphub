// http://tobyho.com/2013/12/02/fun-with-esprima/
// https://www.npmjs.com/package/tern-node-api-doc
// https://gist.github.com/nisaacson/9234157
// http://www.mattzeunert.com/2016/06/10/analyzing-variable-references-with-tern-js.html ***
const fs = require('fs')
const {resolve} = require('path')
const tern = require('tern')
const expose = require('expose-hidden')
const estraverse = require('estraverse')
const log = require('fliplog')
const Belieb = require('./test')

const belieb = new Belieb()
expose(belieb, false)
const file = resolve(__dirname, './test.js')
const contents = fs.readFileSync(file, 'utf8')
// Object.keys(belieb).forEach(b => ternServer.addFile(b + '.js', belieb[b].toString()))
const fns = Object
  .keys(belieb)
  .map(b => {
    // return {key: b, fn: log.data(belieb[b]).tosource().return().datas}
    return log.data(belieb[b]).tosource().return().datas
  }).join('\n')
// log.quick(fns)

let ternServer = new tern.Server({})
let identifierPositions = []
ternServer.on('postParse', (ast) => {
  estraverse.traverse(ast, {
    enter(node) {
      if (node.type === 'Identifier') {
        identifierPositions.push({start: node.start, end: node.end})
      }
    },
  })
})
ternServer.addFile('example.js', contents)
// ternServer.addFile('tosourced.js', fns)

const logged = ['module', 'exports']
// const filters = ['module', 'exports']

identifierPositions.forEach(({start, end}) => {
  let requestDetails = {
    query: {
      types: true,
      // type: 'refs',
      // type: 'definition',
      // type: ['properties', 'documentation'],
      // type: 'properties',
      type: 'documentation',
      file: 'example.js',
      // file: 'tosourced.js',
      // end: identifierPosition,
      start,
      end,
    },
  }
  const reqDetailsNested = {query: {
    type: 'type',
    // types: true,
    file: 'example.js',
    // file: 'tosourced.js',
    start,
    end,
  }}

  // {context: success2.context}
  ternServer.request(requestDetails, (error, success) => {
    ternServer.request(reqDetailsNested, (error2, success2) => {
      // const context = success2 ? success2.context : 'no context'
      const context = success2 ? success2.exprName : false
      if (logged.includes(context)) return

      logged.push(context)

      log
        .data(context)
        .bold(success ? success.type : 'aw')
        .echo()
    })
  })
})
