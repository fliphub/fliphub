class ExecOp {
  // should it subscribe to the event
  // or have a .test?
  handle({context, bundles}) {
    const {name} = context
    const path = bundles.getBundles().getOut()
    if (context.polyfills.window) require('jsdom-global')()
    context.debugFor('exec', `🖥  ops.exec for ${name}`, 'blue', path)

    const execed = require(path)
    context.DebugFor('exec', 'exec result:', 'blue', execed)
    if (typeof execed === 'function') execed()
  }
}

module.exports = ExecOp
