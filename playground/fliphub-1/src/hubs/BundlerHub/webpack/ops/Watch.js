// extends Ops??
class WatchOp {
  // wrap all ops in a promise, then can promise.all
  handle({helpers, builder, context, resolve, reject}) {
    const compiler = webpack(builder.config)
    try {
      compiler.watch({}, (err, stats) => {
        context.debugFor('watch', stats.toString({
          chunks: false,
          colors: true,
        }))

        // context.evts.emit('compiled.${name}')
        resolve(context)
      })
    } catch (e) {
      console.exit(e)
    }
  }
}

module.exports = WatchOp
