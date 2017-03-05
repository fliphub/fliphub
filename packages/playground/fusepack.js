// global.cache = true
// global.NODE_ENV = 'development'
global.flipbox = true

const FlipBox = require('./src/middleout/core/FlipBox')

var externals = [
  'realm-js', 'realm-utils',
  'webpack', 'fuse-box', 'fusebox', 'fsbx', 'happypack',
  'bluebird', 'fsevents',
  // 'yargs',
  // 'child_process',
  'string-replace-webpack-plugin', 'webpack-bundle-analyzer',
  'mocha', 'karma', 'karma-sinon-chai',
  'karma-mocha-reporter', 'karma-notify-reporter',
  'nwb', 'clean-webpack-plugin',
  'jsdom-global', 'jsdom', 'express', 'buble',
  'json', 'json-loader',
  // './dist/flipbox.js': './dist/flipbox.js',
]

// console.log(FlipBox)
const apps = [
  {
    name: 'itself',
    entry: './src/middleout/core/FlipBox.js',
    outFile: './dist/flipboxed.js',
    presets: ['node'],
    // loaders: {
    //   html: true,
    //   json: true,
    // },
    externals,
    params: {
      libraryTarget: 'commonjs2',
    },
  },
]
const flip = FlipBox.init({
  apps,
  root: __dirname,
})
flip.addPreset({
  'node': {
    params: {
      target: 'node',
    },
    loaders: {
      babel: {
        reactjsx: false,
      },
    },
  },
})
flip.addDefaults({
  addedDebug: true,
  debug: true,
})

const built = flip.build()
// const built = require('./dist/flipboxed')

badLog(built)
