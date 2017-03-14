module.exports = function(app, helpers) {
  if (!app.configOut) return app
  var text = 'module.exports = ' + helpers.tosource(app.webpack)
  helpers.file.write(app.configOut, text)
  if (app.debug.out) {
    helpers.log.text.color(`💽  wrote out app config ${app.configOut}`, 'blue')
  }
  return app
}
