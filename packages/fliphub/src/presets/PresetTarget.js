// https://github.com/rollup/rollup-plugin-multi-entry
const log = require('fliplog')

module.exports = class PresetTarget {
  init() {
    this.target = 'node'
  }

  toRollup() {
    const nodeResolve = require('rollup-plugin-node-resolve')
    return {
      pluginIndex: 10,
      plugins: [nodeResolve({
        jsnext: true,
        // main: true,
        // skip: external,
      })],
    }
  }

  toFuseBox() {
    log
      .preset('warn')
      .text('FuseBox has not implemented target yet')
      .echo()
  }

  toWebPack() {
    return {target: this.target}
  }
}
