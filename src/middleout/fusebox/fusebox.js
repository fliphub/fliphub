module.exports = function(app, helpers) {
  if (!app.fusebox) return app
  const fsbx = require('fuse-box')

  if (app.debug.fused) {
    helpers.log.text('💣  🛅  🏗 fuseboxed')

    if (app.debug.verbose) {
      helpers.log.verbose(app.fused)
      helpers.log.verbose(app.fusedConfig)
    }
  }

  // to log ^
  helpers.fuseCommander(app, helpers)



  var loaders = []
  // @TODO:
  // - map with providePlugin
  // - use hookables in middleware to attach fuse or webpack loaders
  //
  // fsbx.EnvPlugin({NODE_ENV: 'production'}),
  // http://fuse-box.org/#loader-plugins
  // fsbx.UglifyJSPlugin(),

  var babelPlugin = fsbx.BabelPlugin({config})
  loaders = [
    // babelPlugin,
    // {
    //   hmrUpdate: (evt) => true,
    // },
    // [babelPlugin, new AliasPlugin({helpers, aliases})],
    // [new AliasPlugin({helpers, aliases})],
    // fsbx.TypeScriptHelpers()
    // [new AliasPlugin({helpers, aliases}), babelPlugin],
    // new AliasPlugin({helpers, aliases, babelPlugin}),
    // [new AliasPlugin({helpers, aliases}), fsbx.BabelPlugin({config}), fsbx.TypeScriptHelpers()],
    // fsbx.TypeScriptHelpers(),
    // fsbx.CoffeePlugin(),
    // fsbx.HTMLPlugin(),
    // [new JSTS({helpers}), fsbx.TypeScriptHelpers()],
    // [fsbx.BabelPlugin({config: babelConfig}), new JSTS({helpers})],
    // [babelPlugin, new JSTS({helpers, babelPlugin})],
    // fsbx.JSONPlugin(),
  ]


  // var appLoaders = Object.keys(app.loaders)
  var appLoaders = app.loaders
  if (appLoaders.svg) loaders.push(fsbx.SVGPlugin(appLoaders.svg))
  if (appLoaders.css) loaders.push(fsbx.CSSPlugin(appLoaders.css))
  // if (appLoaders.babel && !helpers.isArithmetic(app.instructions)) {
  //   loaders.push(babelPlugin)
  // }
  if (appLoaders.tsjs) {
    loaders.unshift([babelPlugin, new JSTS({helpers, babelPlugin})])
  }

  if (app.fuseboxPlugins) loaders = app.fuseboxPlugins
  if (app.fuseboxPluginConfigs) {
    loaders = []
    // @TODO: handle
    // if (typeof app.fuseboxPluginConfigs === 'object')
    app.fuseboxPluginConfigs.forEach(pluginName => {
      var FusePlugin = fsbx[pluginName.toUpperCase() + 'Plugin']
      var config = app.fuseboxPluginConfigs[pluginName]
      if (FusePlugin) {
        loaders.push(FusePlugin(config))
      }
    })
  }

  // -----
  var fuser = () => {
    var params = {
      // dev: true,
      debug: true,
      log: true,
      cache: app.cache,
      homeDir: app.rootDir,
      outFile: app.outFile,
      package: app.name,
      globals: {[app.name]: '*'},
      plugins: loaders,
      // tsConfig: helpers.resolve(`./tsconfig.json`),
    }
    // if (fuseboxAlias) {
    // params.alias = arithmetices
    // params.alias = fuseboxAlias.alias

    // }
    // if (app.useSourceMaps) {
    //   params.sourceMap = {
    //     bundleReference: 'sourcemaps.js.map',
    //     outFile: app.outFileSourcemaps,
    //   }
    // }

    if (app.debug.fuse) {
      helpers.log.text('💣  🛅   fuseboxed... fuser... ')
      helpers.log.verbose(params)
    }
    var fuse = new fsbx.FuseBox(params)

    return fuse
  }
  app.fuser = fuser
  // -----

  if (app.debug.fuseAlias) {
    helpers.log.text('⛓  🔧  🏹 fuseboxed')
    helpers.log.verbose(arithmetices)
    // helpers.log.verbose(relativeAliases)
  }

  return app
}
