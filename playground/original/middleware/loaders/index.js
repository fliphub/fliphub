var babel = require('./babel')
var json = require('./json')
var styles = require('./styles')
var loaders = {
  babel,
  json,
  styleloader: styles,
}

module.exports = function(app, helpers) {
  if (!app.loaders) return app

  if (!app._loaderConfigs) app._loaderConfigs = {}
  var loop = app.loaders
  if (!Array.isArray(loop) && typeof loop === 'object') loop = Object.keys(loop)
  var loadersToAdd = []

  // @TODO: improve
  if (app._config) {
    // delete app.loaders
    // loop = []
    // loadersToAdd = app.webpack.module.loaders

    // cannot use both
    if (app.happypack)
      app.webpack.module.loaders = []
  }
  loop.forEach(loader => {
    var shouldUseLoad = app.loaders[loader]
    if (shouldUseLoad && loaders[loader]) {
      loadersToAdd.push(loaders[loader](app, helpers))
    }
    else  {
      // // @TODO: config this, pushing it anyway
      // loadersToAdd.push(app.loaders[loader] || loader)
      if (app.debug)
        helpers.log({loader, loaders: app.loaders}, '🔎  ⚖️  loader not found')
    }
  })
  if (app._loaders) loadersToAdd = loadersToAdd.concat(app._loaders)
  if (app.fusebox) {
    app._loaderConfigs = loadersToAdd
      .filter(loader => loader.query)
      .map(loader => loader.query)
  }

  if (app.debug.loaders) helpers.log(loadersToAdd, '⚖️ loaders')

  // if we use happypack,
  // it is the only loader,
  // and it takes in all of our other loaders
  if (app.happypack) {
    if (typeof app.happypack !== 'object') app.happypack = {}
    app.happypack.loaders = loadersToAdd

    var happypacks = []
    loadersToAdd.forEach(loader => {
      var name = loader.loader || loader.loaders || loader
      var happypack = {
        test: loader.test,
        loaders: ['happypack/loader?id=' + name],
        // loaders: ['happypack/loader'],
      }
      var appyhap = app.happypack
      // if (appyhap.include)
      //   console.log(appyhap.include)
      if (appyhap.include && appyhap.include[0] && appyhap.include[0].includes('___________')) {
        helpers.log.warn('using default happypack include which is `src/`')
        appyhap.include = [helpers.resolve('./src/')]
      }
      if (appyhap.include) {
        // if (!Array.isArray(appyhap.include)) appyhap.include = [appyhap.include]
        happypack.include = appyhap.include.map(helpers.resolve)
      } else {
        throw new Error('when using happypack, you have to specify which to include')
      }

      happypacks.push(happypack)
    })

    if (app.debug.loaders && app.debug.verbose) helpers.log.verbose(loadersToAdd)
    if (app.debug.loaders && app.debug.verbose) helpers.log.verbose(happypacks)

    return helpers.injectLoaders(app, happypacks)
  } else {
    return helpers.injectLoaders(app, loadersToAdd)
  }
}
