class AbstractCompiler {
  constructor(appsContext) {

  }
  toWebpack() {
    // https://github.com/webpack/docs/wiki/node.js-api#stats
    const webpack = require('webpack')

    const compiler = webpack(config)
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
  }
}
