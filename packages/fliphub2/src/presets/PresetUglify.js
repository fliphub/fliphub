// https://github.com/webpack-contrib/babili-webpack-plugin
// https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino-middleware-minify/index.js
module.exports = class PresetUglify {
  init() {
    this.args = {
      warnings: false,
      compress: {
        screw_ie8: true,
        dead_code: true,
        unused: true,
        drop_debugger: true,
        booleans: true, // various optimizations for boolean context, for example !!a ? b : c → a ? b : c
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
    const {optimize} = require('webpack')
    const {UglifyJsPlugin} = optimize
    return (neutrino) => {
      const eh = neutrino.config
      .merge({plugins: [new UglifyJsPlugin(this.args)]})
      console.log(eh)
      return eh
      // .plugin('uglify')
      // .use(UglifyJsPlugin, this.args)
      // .init(() => new UglifyJsPlugin(this.args))
    }
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
