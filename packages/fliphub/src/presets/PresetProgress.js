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
  toWebpack() {
    const progress = require('neutrino-middleware-progress')
    return (config, workflow, neutrino) => neutrino.use(progress)
  }
  toRollup() {
    const progress = require('rollup-plugin-progress')
    return {
      pluginIndex: 30,
      plugins: [
        progress({
          clearLine: false, // default: true
        }),
      ],
    }
  }
}
