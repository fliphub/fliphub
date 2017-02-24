module.exports = function(app, helpers) {
  if (!app.fusebox) return app
  var fsbx = require('fuse-box')

  // @TODO: deal with relative better
  // @TODO: resolve better & deal with multiple entries
  var entry = app.webpack.entry
  app.contextDir = entry
  app.contextDir = app.contextDir.split('/')
  var instructions = app.contextDir.pop()
  instructions = '>' + instructions
  app.contextDir = app.contextDir.join('/')
  app.outFile = app.outFile ? helpers.resolve(app.outFile) : helpers.getOutputPath(app)
  app.rootDir = helpers.resolve.root
  app.homeDir = helpers.resolve.root
  app.entryAbs = helpers.resolve(app.entry)

  // app.rootDir.slice(app.entryAbs.indexOf(x))
  app.outFolder = app.outFile.slice(0).split('/')
  app.outFolder.pop()
  app.outFolder = app.outFolder.join('/')

  app.homeToEntry = helpers.path.relative(app.homeDir, app.entryAbs)
  instructions = '>' + app.homeToEntry

  if (app.externals) {
    Object.keys(app.externals).forEach(external => instructions += ' -' + external)
  }

  // @TODO:
  // - [ ] improve
  // - [ ] check if last is /
  // if it does not have a `.` it might not be a full entry point
  if (!instructions.includes('.')) {
    instructions = instructions + '/index.js'
  }

  // @TODO: if last char is not already a `/`
  app.rootDir = app.rootDir + '/'
  app.homeDir = app.homeDir + '/'
  app.outFileSourcemaps = app.outFileSourcemaps || helpers.resolve('./dist/sourcemaps.js.map')

  app.configOut = app.configOut ? app.configOut : './dist/aliasConfig.js'
  try {
    app._configOut = app.configOut
    app.configOut = helpers.resolve(app.configOut)
  }
  catch (e) {
    console.log(e)
  }

  // @TODO: try again eh
  // var babelAlias = []
  // if (app.alias && app.configOut) {
  //   babelAlias = [
  //     'babel-plugin-webpack-aliases', {
  //       'config': app.configOut,
  //     },
  //   ]
  // }
  var fuseboxAlias = false
  // if (app.fuseboxAlias) {
  //   babelAlias = false
  // }
  // babelAlias = true

  // @TODO: use babel loader created in loaders
  var babelConfig = {
    'sourceMaps': app.useSourceMaps,
    'presets': ['latest'],
    'plugins': [
      'transform-react-jsx',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
      'transform-class-properties',
      'add-module-exports',
    ],
  }

  // app.alias &&
  // if (babelAlias) {
  //   babelConfig.plugins.unshift(babelAlias)
  // }
  // forcing it for now until it works better with fuse
  var babelModuleAlias = true
  var babelRelativeAlias = true

  app.fusedConfig = {
    instructions,
  }
  helpers.log.verbose(app.fused)
  // helpers.log.verbose(app.fusedConfig)
  helpers.log.text('💣  🛅  🏗 fuseboxed')
  helpers.log.verbose(babelConfig)

  // to log ^
  helpers.fuseCommander(app, helpers)

  // go from absolute to relative
  // https://nodejs.org/api/path.html#path_path_resolve_path
  // https://webpack.github.io/docs/resolving.html
  // @TODO: move this into a helper, and into the aliaser
  var aliases = app.webpack.resolve.alias
  var aliasesKeys = Object.keys(aliases)
  var relativeAliases = {}
  var arithmetices = {}
  aliasesKeys.forEach(name => {
    var aliasPath = aliases[name]

    // @TODO: if aliases are outside of the homedir, warn
    // var arithmetic = helpers.path.relative(app.homeDir, aliasPath)
    var arithmetic = '~/' + aliasPath.split(app.homeDir).pop()
    arithmetices[name] = arithmetic

    // var relativeAlias = helpers.path.relative(entry, aliasPath)
    // var relativeAlias = helpers.path.relative(entry, aliasPath)
    // @TODO: !!!!!!!!!! THIS ONLY REASOVES TO ENTRY RELATIVELY!!!
    // @TODO: fix
    // replace the first one, since it resolves wrong for now
    // relativeAlias = relativeAlias.replace('../', './')
    // relativeAlias = relativeAlias.replace('../', '')
    // relativeAliases[name] = relativeAlias
  })

  if (!app._webpack) app._webpack = {}
  app._webpack = Object.assign(app._webpack, {
    resolve: {
      alias: aliases,
    },
  })
  // app.webpack.resolve.alias = relativeAliases

  if (app.fuseboxAlias) {
    fuseboxAlias = {
      alias: arithmetices,
    }
  } else if (babelModuleAlias) {
    var babelModuleAliasPlugin = ['module-resolver', {
      // 'root': ['./**/**/'],
      'root': ['./'],
      'alias': aliases,
    }]
    babelConfig.plugins.unshift(babelModuleAliasPlugin)
  }
  // if (babelRelativeAlias) {
  //   var resolveRelativeModule = require('babel-resolve-relative-module')
  //   var resolveRelativeModule = [
  //   babelConfig.plugins.unshift(resolveRelativeModule)
  // }


  var loaders = []
  // @TODO:
  // - map with providePlugin
  // - use hookables in middleware to attach fuse or webpack loaders
  //
  // fsbx.EnvPlugin({NODE_ENV: 'production'}),
  // http://fuse-box.org/#loader-plugins
  // fsbx.UglifyJSPlugin(),
  //

  loaders = [
    {
      hmrUpdate: (evt) => true,
    },
    // fsbx.CoffeePlugin(),
    // fsbx.HTMLPlugin(),
    fsbx.SVGPlugin(),
    fsbx.CSSPlugin(),
    fsbx.BabelPlugin({
      config: babelConfig,
    }),
    fsbx.JSONPlugin(),
  ]

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
    console.log('fusa')
    var params = {
      // dev: true,
      debug: true,
      cache: false,
      homeDir: app.rootDir,
      outFile: app.outFile,
      package: app.name,
      globals: {[app.name]: '*'},
      plugins: loaders,
    }
    if (fuseboxAlias) {
      params.alias = fuseboxAlias.alias
    }
    if (app.useSourceMaps) {
      params.sourceMap = {
        bundleReference: 'sourcemaps.js.map',
        outFile: app.outFileSourcemaps,
      }
    }

    if (app.debug.fuse) {
      helpers.log.text('💣  🛅   fuseboxed... fuser... ')
      helpers.log.verbose(params)
    }
    var fuse = new fsbx.FuseBox(params)

    return fuse
  }
  app.fuser = fuser
  // -----

  if (app.debug.fuse) {
    helpers.log.text('⛓  🔧  🏹 fuseboxed')
    helpers.log.verbose(arithmetices)
    // helpers.log.verbose(relativeAliases)
  }

  return app
}
