// HERE, REGISTER BUILDER OPS
const {SubHub} = require('../../AbstractHub')
const Compiler = require('./ops/Compile')
const Runner = require('./ops/Run')
const Dry = require('./ops/Dry')
const Plugins = require('./plugins')
const Translator = require('./translators')

// TODO:
// now add instructions for bundles could be as a plugin
// then make webpack work for each op
// fix muliple apps
// then add releasing
// then add any required leftovers
// each leftover prop for app just emit each one?
class FuseBoxHub extends SubHub {
  init(args) {
    const {context} = args
    // context.once('builder.fusebox', () => {
    //   console.exit('weird')
    //   new Translator().init(args).translate(args)
    // })
    Plugins.init(args)
    new Translator(args).init(args).translate(args)
  }

  ops({context, helpers, box, app}) {
    const {builder, name, bundles} = context
    const {api} = builder
    const promises = []

    context.on(`ops.dry.${name}`, (args) => {
      const dry = new Dry()
      bundles.getPieces().forEach(bundle => dry.handle({
        helpers, box,
        context, app, name,
        builder, api,
        bundle, bundles,
        // resolve, reject,
      }))
    })

    context.evts.on(`ops.run.${name}`, (args) => {
      const runner = new Runner()
      try {
        // promises.push(new Promise((resolve, reject) =>
        bundles.getPieces().forEach(bundle => runner.handle({
          helpers, box,
          context, app, name,
          builder, api,
          bundle, bundles,
          // resolve, reject,
        }))
        // ))
      } catch (e) {
        console.exit(e)
      }
    })

    // @TODO: move to fusebox ops instead
    context.evts.on(`ops.compile.${name}`, (args) => {
      const compiler = new Compiler()
      try {
      // promises.push(new Promise((resolve, reject) =>
        bundles.getPieces().forEach(bundle => compiler.handle({
          helpers, box,
          context, app, name,
          builder, api,
          bundle, bundles: context.bundles,
        // resolve, reject,
        }))
      }
      catch (e) {
        console.exit(e)
      }
      // ))

      // instance.bundle('>' + context.bundles[0].pm.in.entry)
    })
    // context.on('ops.compile', (args) => {
    //   console._debug(args)
    // })
    // on('ops.run.' + name, (args) => context.run(args))
    // on('ops.exec.' + name, (args) => context.exec(args))
    // on('ops.release.' + name, (args) => context.release(args))
    // on('ops.clean.' + name, (args) => context.clean(args))
    // on('ops.test.' + name, (args) => context.test(args))
    // on('ops.dry.' + name, (args) => context.dry(args))
    // on('ops.watch.' + name, (args) => context.watch(args))
  }

  // if I add compile here, it won't filter and such...
  // this is bottom up we need top down
  //
  // the filter hub should handle the filtering
  // and then the ops bundle emits
  //
  // decorateBox({context, app, helpers, box}) {}

  decorate() {

  }
}

module.exports = FuseBoxHub
