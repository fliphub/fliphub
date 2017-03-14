const ConfigOut = {
  name: 'configout',
  decorate(app, helpers) {
    app.configOut = app.configOut ? app.configOut : './dist/aliasConfig.js'
    try {
      app._configOut = app.configOut
      app.configOut = helpers.resolve(app.configOut)
    }
    catch (e) {
      console.log(e)
    }

    if (!app.configOut) return app
    var text = 'module.exports = ' + helpers.tosource(app.webpack)
    helpers.file.write(app.configOut, text)
    if (app.debug.out) {
      helpers.log.text.color(`💽  wrote out app config ${app.configOut}`, 'blue')
    }
    return app
  },
}

module.exports = ConfigOut
