const {SubHub} = require('../../AbstractHub')
const Compiler = require('./ops/Compile')
const Runner = require('./ops/Run')
const Dry = require('./ops/Dry')
const Translator = require('./translator')

class WebPackHub extends SubHub {
  init(args) {
    const {context, helpers, box, app} = args
    // context.once('builder.webpack', () => {
    //   new Translator().init(args).translate(args)
    // })
    new Translator().init(args).translate(args)
  }

  ops({context, helpers, box, app}) {
    const compiler = new Compiler()
    const runner = new Runner()
    const dry = new Dry()
    const {builder, name, bundles} = context
    const {api} = builder

    // TODO:
    // now add instructions for bundles could be as a plugin
    // then make webpack work for each op
    // fix muliple apps
    // then add releasing
    // then add any required leftovers
    // each leftover prop for app just emit each one?

    // context.evts.on(`ops.compile.${name}`, (args) =>
    //   compiler.handle({
    //     helpers, box,
    //     app, name, context,
    //     builder,
    //     api,
    //   }))
    context.evts.on(`ops.dry.${name}`, (args) => {
      dry.handle({
        context, app, helpers, box,
        builder, api, name, bundles,
      })
    })

    const promises = []
    promises.push(new Promise((resolve, reject) =>
      context.evts.on(`ops.compile.${name}`, (args) =>
        compiler.handle({
          context, app, helpers, box,
          builder, api, name, bundles,
          resolve, reject,
        }))
    ))

    promises.push(new Promise((resolve, reject) =>
      context.evts.on(`ops.run.${name}`, (args) => runner.handle({
        context, app, helpers, box,
        builder, api, name, bundles,
        resolve, reject,
      }))
    ))

        // ops here


    // context.evts.on(`ops.compile.${name}`, (args) =>
    //   context.bundles.bundles.forEach(bundle =>
    //       compiler.handle({
    //         context, app, helpers, box,
    //         bundle, builder, name,
    //       })))

    // const {name} = app
    // const {on} = box.evts
    // on('ops.compile.' + name, (args) => context.compile(args))
    // on('ops.run.' + name, (args) => context.run(args))
    // on('ops.exec.' + name, (args) => context.exec(args))
    // on('ops.release.' + name, (args) => context.release(args))
    // on('ops.clean.' + name, (args) => context.clean(args))
    // on('ops.test.' + name, (args) => context.test(args))
    // on('ops.dry.' + name, (args) => context.dry(args))
    // on('ops.watch.' + name, (args) => context.watch(args))
  }

  decorate() {

  }
}

module.exports = WebPackHub
