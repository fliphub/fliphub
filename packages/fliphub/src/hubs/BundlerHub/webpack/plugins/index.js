const loaderOptions = require('./loaderOptions')
const analyze = require('./Analyze')
const noEmitErrors = require('./noEmitErrors')

const define = require('./Definitions')
const provide = require('./Provide')
const leftovers = require('./Leftovers')

// const replace = require('./replace')
const uglify = require('./Uglify')
// const happypack = require('./happypack')

const plugins = [
  loaderOptions,
  analyze,
  noEmitErrors,
  define,
  provide,
  uglify,
  // happypack,
  leftovers,
]

const Plugins = {
  init({context}) {
    context.emit('subscribePlugins', plugins)
  },
}

module.exports = Plugins
