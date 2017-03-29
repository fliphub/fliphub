// https://github.com/webpack-contrib/babili-webpack-plugin
// https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino-middleware-minify/index.js
// https://github.com/babel/babili/blob/master/packages/babel-preset-babili/README.md#options
/* eslint camelcase: 0 */
module.exports = class PresetUglify {
  init() {
    this.args = {
      warnings: false,
      compress: {
        screw_ie8: true,
        dead_code: true,
        unused: true,
        drop_debugger: true,

        // various optimizations for boolean context,
        // for example !!a ? b : c → a ? b : c
        booleans: true,
      },
      mangle: {
        screw_ie8: true,
      },
    }
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  toWebpack() {
    // uglify is not as helpful as babeli
    const {optimize} = require('webpack')
    const {UglifyJsPlugin} = optimize
    return {plugins: [new UglifyJsPlugin(this.args)]}
    // .plugin('uglify')
    // .use(UglifyJsPlugin, this.args)
    // .init(() => new UglifyJsPlugin(this.args))
    // return {plugins: [new UglifyJsPlugin(this.args)]}
  }
  toRollup() {
    const uglify = require('rollup-plugin-uglify')
    const filesize = require('rollup-plugin-filesize')

    // Filesize plugin needs to be last
    // to report correct filesizes when minified
    return {
      pluginIndex: 100,
      plugins: [uglify(), filesize()],
    }
  }
  toFuseBox() {
    const {UglifyJSPlugin} = require('fuse-box')
    return {plugins: [UglifyJSPlugin()]}
  }
}
