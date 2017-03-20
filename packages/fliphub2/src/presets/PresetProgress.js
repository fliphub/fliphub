const is = require('izz')

// @NOTE: this is included in preset-neutrino-web
// https://github.com/mozilla-neutrino/neutrino-dev/tree/master/packages/neutrino-middleware-progress
// https://github.com/jkuri/rollup-plugin-progress
module.exports = class PresetProgress {
  toFuseBox() {
    return {
      log: true,
      debug: true,
    }
  }
  toWebpack() {}
  toRollup() {
    const progress = require('rollup-plugin-progress')
    return {
      pluginIndex: 0,
      plugins: [
        progress({
          clearLine: false, // default: true
        }),
      ],
    }
  }
}
