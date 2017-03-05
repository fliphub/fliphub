class ExecOp {
  // should it subscribe to the event
  // or have a .test?
  handle({context}) {
    const {name} = context
    context.debugFor('exec', `🖥  ops.exec for ${name}`, 'orange')

    if (context.polyfills.window) require('jsdom-global')()
    var result = this.helpers.getOutputPath(app)
    if (app.debug.exec)
      this.helpers.log(result, {level: 'exec for built output path:'})
    var exec = require(result)
    if (app.debug.exec)
      this.helpers.log(exec, {level: 'exec result:'})
    required[app.name] = exec
    if (typeof exec === 'function') exec()
  }
}
