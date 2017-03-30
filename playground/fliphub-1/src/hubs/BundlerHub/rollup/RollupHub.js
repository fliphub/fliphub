const {SubHub} = require('../../AbstractHub')
const Compiler = require('./ops/Compile')

class RollupHub extends SubHub {
  init(args) {
    const {context, helpers, box, app} = args
    // new Translator().init(args).translate(args)
  }

  ops({context, helpers, box, app}) {
    const compiler = new Compiler()
    const {builder, name, bundles} = context
    const {api} = builder

    context.evts.on(`ops.compile.${name}`, (args) =>
      compiler.handle({
        context, app, helpers, box,
        builder, api, name, bundles,
      }))
  }

  decorate() {

  }
}

module.exports = RollupHub
