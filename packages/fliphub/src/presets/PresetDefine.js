const log = require('fliplog')

module.exports = class PresetDefine {

  setArgs(args) {
    if (args) this.args = args
    if (this.args) this.args._noop = function(noop) { /* noop */ }
  }

  // toConfig...
  toRollup() {
    const replace = require('rollup-plugin-replace')
    return {
      pluginIndex: 89,
      plugins: [
        replace(this.args),
      ],
    }
  }

  toFuseBox() {
    const {FuseBox, ReplacePlugin} = require('fuse-box')

    return {
      pluginIndex: 89,
      plugins: [
        ReplacePlugin(this.args),
      ],
    }
  }

  toWebpack() {
    const {DefinePlugin} = require('webpack')

    return (config, workflow, neutrino) => {
      neutrino.config
        .plugin('define')
        .use(DefinePlugin, this.args || {})
    }
  }
}
