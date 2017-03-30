// const FlipBoxed = require('../flipbox/src/lib/deps/index.js')

var fsbx = require('fsbx')
// var fsbx = require("fuse-box")
const FuseBox = fsbx.FuseBox

const config = {
  homeDir: '/Users/james/code/yuge-full/',
  outFile: './dist/justfuse.js',
  log: true,
  debug: true,
  cache: false,
  package: 'one',
  globals: {one: '*'},
  alias: {
    'one': '~/package/one/index.js',
    'two': '~/package/two/index.js',
  },
  // tsConfig: '/Users/james/code/yuge/tsconfig.json',
  plugins: [
    // fsbx.BabelPlugin({
    //   config: {
    //     presets: ['latest']
    //   }
    // })
    // fsbx.CoffeePlugin(),
    // fsbx.UglifyJSPlugin(),
  ],
}

// const instructions = `>package/one/index.js`
// const instructions = '>./packages/mockablejs/index.js'
const instructions = '>./packages/mockable/index.ts'
const fuse = FuseBox.init(config)
const bundled = fuse.bundle(instructions)
