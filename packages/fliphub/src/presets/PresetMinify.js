// https://github.com/Comandeer/rollup-plugin-babili
// https://github.com/babel/babili/blob/master/packages/babel-preset-babili/README.md#options
// https://github.com/babel/babili#individual-plugins
// https://github.com/babel/babel-preset-env/pull/178
module.exports = class PresetMinify {
  init() {
    this.args = {
      'evaluate': true,
      'deadcode': true,
      'infinity': true,
      'mangle': true,
      'numericLiterals': true,
      'replace': true,
      'mergeVars': true,
      'booleans': true,
      'regexpConstructors': true,
      'removeConsole': false,
      'removeDebbugger': false,
      'removeUndefined': false,
      'undefinedToVoid': true,
    }

    this.babelArgs = {
      'presets': [
        ['env', {
          'targets': {
            'uglify': true,
          },
          'modules': false,
        }],
      ],
      'plugins': [
        'external-helpers',
        ['babili', {
          'unsafe': false,
          'evaluate': true,
          'deadcode': true,
          'infinity': true,
          'mangle': true,
          'numericLiterals': true,
          'replace': true,
          'mergeVars': true,
          'booleans': true,
          'regexpConstructors': true,
          'removeConsole': false,
          'removeDebbugger': false,
          'removeUndefined': false,
          'undefinedToVoid': true,
        }],
      ],
    }
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  toWebpack() {
    const minify = require('neutrino-middleware-minify')
    return (neutrino) => neutrino.use(minify)
  }
  toRollup() {
    const babili = require('rollup-plugin-babili')
    const filesize = require('rollup-plugin-filesize')
    // Filesize plugin needs to be last
    // to report correct filesizes when minified
    return {
      pluginIndex: 100,
      plugins: [babili(this.args), filesize()],
    }
  }

  // https://github.com/fuse-box/fuse-box/issues/423
  toFuseBox(config) {
    const {BabelPlugin} = require('fsbx')
    const {UglifyJSPlugin} = require('fuse-box')

    return {
      pluginIndex: 100,
      plugins: [[BabelPlugin({config: this.babelArgs}), UglifyJSPlugin()]],
      // plugins: [BabelPlugin()],
    }
  }
}
