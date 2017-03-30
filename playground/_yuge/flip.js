global.compile = true
global.fusebox = true
global.fuseboxAlias = true
const FlipBox = require('../flipbox/src/index.js')
// const FlipBox = require('../flipbox/flip.js')
// const FlipBoxed = require('../flipbox/src/deps/index.js')
// console.log(FlipBox)
// var aliases = require('./aliases/eh.js')

let mask = '**/*.ts'
var included = `
  >./packages/ds--sowa/index.ts
  +[./packages/ds--sowa/**/${mask}]
  +[./packages/ds--builder/**/${mask}]
  +[./packages/model/**/${mask}]
  +[./packages/gommy/**/**/*.js]
`
// +immutable
included = `
  >./packages/minimal/index.ts
`

function oh(opts) {
  return Object.assign({
    root: __dirname,
    name: 'how-slow-can-you-go',
    homeDir: './',
    happypack: false,

    // /Users/james/code/yuge/packages/model/build/the-data-modeler-browserified.ts
    entry: './packages/minimal/index.ts',
    // instructions: included,
    // arithmetics: included,

    // entry: './packages/mockablejs/index.js',
    // entry: './packages/ds--sowa/index.ts',
    alias: ['eh', 'aliasing'],
    // alias: {},
    // _alias: aliases,
    outFile: './dist/solvedit.js',
    fusebox: global.fusebox,
    // compile: true,
    cache: false,
    fuseboxAlias: true,
    // loaders: {
    //   'babel': true,
    //   'json': true,
    //   // 'ts': true,
    // },

    // loaders: {
    //   'json': true,
    //   'babel': {
    //      test: /.t|js$/,
    //   },
    // },
    // _loaders: [{
    //   test: /\.tsx?$/,
    //   loader: 'awesome-typescript-loader',
    // }]
  }, opts)
}

included = {
  "./dist/solvedit.js": `>./packages/minimal/index.ts`,
  "./dist/model.js": `>./packages/model/build/the-data-modeler-browserified.ts`,
}

var one = oh({
  outFile: "./dist/minimal.js",
  name: 'minimal',
  instructions: `>packages/minimal/index.ts`,
  arithmetics: `>packages/minimal/index.ts`,
})
var two = oh({
  outFile: "./dist/modeler.js",
  name: 'modeler',
  instructions: `>packages/model/build/the-data-modeler-browserified.ts`,
  arithmetics: `>packages/model/build/the-data-modeler-browserified.ts`,
})
var three = oh({
  outFile: "./dist/minimal-model.js",
  name: 'minimal-model',
  // instructions: `>dist/minimal.js +[dist/modeler.js]`,
  // arithmetics: `>dist/minimal.js +[dist/modeler.js]`,
  instructions: `>packages/minimal-modeler.ts +[dist/modeler.js] +[dist/minimal.js]`,
  arithmetics: `>packages/minimal-modeler.ts +[dist/modeler.js] +[dist/minimal.js]`,
  exec: true,
})
var four = oh({
  outFile: "./dist/four.js",
  name: 'four',
  instructions: `>package/one/index.ts`,
  arithmetics: `>package/one/index.ts`,
  exec: true,
})

const apps = [one, two, three]
// const apps = [four]

const flip = new FlipBox({
  apps,
  aliasDir: './aliases/',
})

flip.fullAuto()
