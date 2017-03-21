const is = require('izz')
const log = require('fliplog')

module.exports = class PresetVisualize {
  init() {
    this.run = null
    this.file = null
    this.sourceMap = true
  }

  setArgs(args) {}

  toRollup() {
    const Visualizer = require('rollup-plugin-visualizer')
    return {
      plugins: [
        Visualizer({sourcemap: true}),
      ],
    }
  }
  toWebpack() {
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
    return {plugins: [new BundleAnalyzerPlugin()]}
  }
}
