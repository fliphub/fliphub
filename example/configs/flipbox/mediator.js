
var externals = {
  // 'webpack': 'webpack',
  // 'fs': 'fs',
  // 'path': 'path',
  // 'net': 'net',
  // 'yargs': 'yargs',
  // 'child_process': 'child_process',
  // 'connect-history-api-fallback': 'connect-history-api-fallback',
  // 'webpack-dev-middleware': 'webpack-dev-middleware',
  // 'string-replace-webpack-plugin': 'string-replace-webpack-plugin',
  // 'webpack-bundle-analyzer': 'webpack-bundle-analyzer',
  //
  // 'mocha': 'mocha',
  // 'karma': 'karma',
  // 'karma-sinon-chai': 'karma-sinon-chai',
  // 'karma-mocha-reporter': 'karma-mocha-reporter',
  // 'karma-notify-reporter': 'karma-notify-reporter',

  // 'fuse-box': 'fuse-box',
  'happypack': 'happypack',
  'nwb': 'nwb',
  'clean-webpack-plugin': 'clean-webpack-plugin',
  'copy-webpack-plugin': 'copy-webpack-plugin',

  'jsdom-global': 'jsdom-global',
  'jsdom': 'jsdom',
  'express': 'express',

  'html-webpack-plugin': 'html-webpack-plugin',
  'buble': 'buble',

  'json': 'json',
  'json-loader': 'json-loader',

  './dist/flipbox.js': './dist/flipbox.js',
}

var flipbox = {
  name: 'flipbox',
  // compile: true,
  happypack: false,
  debug: {
    built: true,
    loaders: true,
  },
  alias: ['moose', 'igloo'],

  // fuseboxAlias: true,
  fusebox: true,
  // fuseboxPlugins: [],
  // fuseboxPluginConfigs: ['json'],
  presets: ['node'],
  loaders: {
    // 'babel': false,
    // 'json': false,
    // 'babel': {
    //   exclude: /node_modules/,
    // },
  },

  // @TODO: map to fusebox bundling
  externals,
  entry: './src/index.js',
  outFile: './dist/flipbox.js',
}

var flipboxTests = Object.assign({}, flipbox)
flipboxTests = Object.assign(flipboxTests, {
  name: 'flipbox-tests',
  // alias: {
  //   'flipbox-dist': './dist/flipbox.js',
  // },
  entry: './tests/builds-itself.js',
  outFile: './dist/flipbox-tests.js',
  presets: ['test', 'mocha'],
})

var apps = [
  flipbox,
  // flipboxTests,
]

var FlipBox = require('../../../src')
var flip = new FlipBox({
  // if undefined, still falls back to root
  // since condition is falsy
  root: global._dirname,
  apps,
  defaultAppNames: ['flipbox', 'flipbox-tests'],
  aliasDir: './example/configs/aliases/',
  debug: {
    verbose: true,
    filter: true,
  },
})

flip.fullAuto()
module.exports = flip.mediator()
