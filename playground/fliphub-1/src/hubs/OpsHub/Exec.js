class ExecOp {
  handle({context}) {
    const {name, bundles, builder} = context
    // bundles.asFull().out.abs
    const path = bundles.getBundle().outFile()

    if (context.polyfills.window) require('jsdom-global')()
    context.debugFor('exec', `🖥  ops.exec for ${name}`, 'blue', path)

    const execed = require(path)
    // context.debugFor('exec', 'exec result:', 'blue')
    console.verbose(execed, {level: 'exec result', color: 'blue'})
    if (typeof execed === 'function') execed()
  }
}

module.exports = ExecOp
