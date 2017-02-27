

// https://github.com/amireh/happypack/issues/53#issuecomment-226356543
// @TODO: clean up, move to loaders?
function happypack(app, helpers) {
  if (app.happypack === false) return app
  var HappyPack = require('happypack')

  var params = {
    // loaders is the only required parameter:
    loaders: app.happypack.loaders,
    verbose: app.debug.happypack,
    cache: false,
  }

  if (app.debug.happypack && app.debug.verbose) {
    params.debug = true
  }

  // only valid params
  var filtered = Object.assign({}, app.happypack)

  // if (app.debug.happypack)
  //   helpers.log(app.happypack, {level: '☺️️  🛅  🏗  happypack', verbose: false})

  // @NOTE: include is only used in loaders, not plugin
  delete filtered.include

  // merge options
  params = Object.assign(params, filtered)

  var happypacks = []
  app.happypack.loaders.forEach(loader => {
    var loaderParams = params
    var name = loader.loader || loader.loaders
    loaderParams.loaders = [loader]
    loaderParams.id = name
    happypacks.push(new HappyPack(loaderParams))
  })

  if (app.debug.happypack) {
    if (app.debug.verbose)
      helpers.log.verbose(happypacks, {level: '☺️️  🛅  🏗  happypacks'})
    else
      helpers.log(happypacks, {level: '☺️️  🛅  🏗  happypacks'})
  }

  return helpers.injectPlugins(app, happypacks)

  // single plugin, using multi ^
  // var happypackPlugin = new HappyPack(params)
  // return helpers.injectPlugins(app, happypackPlugin)
}
