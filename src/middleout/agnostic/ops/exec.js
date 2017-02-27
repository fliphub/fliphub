this.helpers.log.text('🖥  exec()')

if (!apps) {
  apps = this.builtApps
  var filter = this.helpers.flags.searchAll('exec', {type: 'arr'})
  if (filter) apps = apps.filter(app => filter.includes(app.name) || app.exec)
  var required = {}
}

apps.forEach(app => {
  if (app.debug.exec)
    this.helpers.log(app.name, {level: 'exec for'})

  if (typeof app.exec === 'function') {
    required[app.name] = app.exec()
  }
  else {
    if (app.windowPolfyill) require('jsdom-global')()
    var result = this.helpers.getOutputPath(app)
    if (app.debug.exec)
      this.helpers.log(result, {level: 'exec for built output path:'})
    var exec = require(result)
    if (app.debug.exec)
      this.helpers.log(exec, {level: 'exec result:'})
    required[app.name] = exec
    if (typeof exec === 'function') exec()
  }
})
