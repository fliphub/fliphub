// goes after uglify
// https://github.com/infernojs/inferno/blob/dev/bin/rollup#L115
// log.stacks(true)
const log = require('fliplog')

class OptimizeJsPlugin {
  constructor(opts) {
    this.test = /\.(j|t)s(x)?$/
    if (opts !== null) this.opts = opts
  }

  init(context) {
    this.context = context
  }

  transform(file, ast) {
    const optimizeJs = require('optimize-js')
    let output
    try {
      output = optimizeJs(file.contents, this.opts)
      log.emoji('perf').text('optimized').data(output).echo()
      file.contents = output
    } catch (error) {
      log.catch(error)
    }
    file.analysis.analyze()
  }
}

module.exports = class PresetOptimizeJs {
  constructor() {
    // @TODO -
    // implement this to order presets,
    // only hubs should add presets,
    // or a preset can _be_ a hub if it extends `hub` and uses workflow...
    this.index = 110
    this.args = {
      sourceMap: true,
    }
  }

  setArgs(args) {
    if (args !== null) this.args = args
  }

  toFuseBox() {
    return [new OptimizeJsPlugin(this.args)]
  }

  toWebpack() {
    const optimizeJsPlugin = require('optimize-js-plugin')
    return {
      // pluginIndex: 110,
      plugins: [
        new optimizeJsPlugin(),
      ],
    }
  }

  toRollup() {
    const optimizeJs = require('optimize-js')
    const plugin = {
      name: 'optimizeJs',
      transformBundle(code) {
        return optimizeJs(code)
      },
    }
    return {
      pluginIndex: 110,
      presets: [plugin],
    }
  }
}
