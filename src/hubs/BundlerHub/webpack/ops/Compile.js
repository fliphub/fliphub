const Config = require('../config/config')

// https://github.com/webpack/docs/wiki/node.js-api#stats
// extends Ops??
class CompileOp {
  // wrap all ops in a promise, then can promise.all
  handle(args) {
    const {api, context, resolve} = args
    const config = Config.parse(args)

    // @NOTE: to throw a validation error and see the log
    // config.resolve.alias.eh = true
    try {
      const compiler = api(config)
      compiler.run((err, stats) => {
        if (err) console.exit(err)
        context.debugFor('compile', stats.toString({
          chunks: true,
          colors: true,
          verbose: true,
          reasons: true,
          hash: true,
          version: true,
          timings: true,
          assets: true,
          chunkModules: true,
          modules: true,
          children: true,
          cached: true,
          errorDetails: true,
          chunkOrigins: true,
          // context: true,
          // source: true,
          // modulesSort:
          // assetsSort
          // chunksSort
        }))

        // context.evts.emit('compiled.${name}')
        resolve(context)
      })
    } catch (e) {
      console._verbose(e)
      console._exit(e)
    }
  }
}

module.exports = CompileOp
