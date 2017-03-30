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
      log.error(error).echo()
    }
    file.analysis.analyze()
  }
}
