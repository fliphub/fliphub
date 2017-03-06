module.exports = function(app, helpers) {
  if (!app.alias && !app._alias) return app

  // use the aliaser helper class
  if (app.alias)
    app.webpack.resolve.alias = helpers.aliaser.requireAndHandle(app.alias)

  if (app._alias) {
    // go through the object keys
    // assign to config
    // resolve the value
    Object.keys(app._alias).forEach(alias => {
      app.webpack.resolve.alias[alias] = helpers.resolve(app._alias[alias])
    })
  }

  if (app.debug.alias)
    helpers.log({alias: app.alias, _alias: app._alias}, {level: '⛓  🏹  aliasing'})

  // app.__alias = app.webpack.resolve.alias
  return app
}
