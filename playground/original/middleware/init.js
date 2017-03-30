module.exports = function(app, helpers) {
  // @example:
  // ['styleloader'] -> {styleloader: {}}
  if (Array.isArray(app.loaders)) {
    var loaders = {}
    app.loaders.forEach(loader => loaders[loader] = {})
    app.loaders = loaders
  }

  // @example:
  // alias: {'hullabaloo': './src/backend/index.js'},
  if (!Array.isArray(app.alias) && app.alias && typeof app.alias === 'object') {
    app._alias = app.alias
    delete app.alias
  }

  // @TODO: have helper like `.isApp`
  // then it is not an app, is a preset or other
  //
  // @example:
  // presets: {
  //   inferno: {
  //     loaders: ['styleloader']
  //   }
  // }
  if (!app.params && !app.config && !app.entry) {
    Object.keys(app).forEach(prop => {
      var loaders = {}
      var propLoaders = app[prop].loaders
      if (Array.isArray(propLoaders)) {
        propLoaders.forEach(loader => loaders[loader] = {})
        app[prop].loaders = loaders
      }
    })
  }

  return app
}
