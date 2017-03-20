const AbstractHub = require('../AbstractHub')
const ExecOp = require('./Exec')

// @TODO:
//
// in here filter,
// then subscribe default ops,
// then if app has the op that was emitted,
// remove other listeners for it,
// since it is per appcontext
//
//
// @TODO:
// should do ops in order with promises...
// can't exec until built...
// can do this by checking subscriptions to these ops
class OpsHub extends AbstractHub {
  appInit(args) {
    const {context, app, helpers, box} = args
    const {name} = context

    context.evts.once(`ops.exec.${name}`, () => {
      const exec = new ExecOp()
      if (context.evts.listeners(`ops.compile.${name}`))
        context.evts.once(`opted.compiled.${name}`, () => exec.handle(args))
      else
        exec.handle(args)
    })

    context.evts.once('appBuilt', () => {
      const {ops} = context
      Object.keys(ops).forEach(op => {
        args.op = ops[op]
        // console.debug({op, oped: ops[op]})
        if (op && ops[op]) context.evts.emit(`ops.${op}.${name}`, args)
      })
    })
  }

  defaults(args) {
  }

  decorate({context, app}) {
    const defaults = {
      ops: {
        watch: false,
        release: false,
        compile: false,
        exec: false,
        test: false,
        run: false,
        dry: false,

        server: {
          port: 3333,
          middleware: [],
        },
      },
    }

    Object.keys(defaults.ops).forEach(op => {
      if (app[op]) defaults.ops[op] = app[op]
      if (app.ops && app.ops[op] !== undefined) defaults.ops[op] = app.ops[op]
      // if (context[op]) defaults.ops[op] = context[op]
    })

    if (app.server)
      defaults.ops.server = Object.assign(defaults.ops.server, app.server)
    if (app.port)
      defaults.ops.server.port = app.port

    // clean up context, should have a clean lifecycle method
    context = Object.assign(context, defaults)
  }
}

module.exports = OpsHub
