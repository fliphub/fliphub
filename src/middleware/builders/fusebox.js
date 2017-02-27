// var JSTS = require('./plugins/JavaScriptToTypeScriptPlugin')
// var AliasPlugin = require('./plugins/AliasPlugin')
var babelLoaderBuilder = require('babel-loader-builder')
var params = {
  asObject: true,
  // stringify: true,
  // react: false,
  // reactjsx: false,
  stripFlow: true,
  async: false,
  reactjsx: false,
  inferno: {
    imports: true,
    compat: true,
  },
  // sourceMaps: true,
  plugins: [
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: true},
    ],
  ],
}
var config = babelLoaderBuilder(params)
delete config.babelrc
delete config.cacheDirectory
// config = JSON.stringify(config)

module.exports = function(app, helpers) {
  if (!app.fusebox) return app
  // var fsbx = require('fuse-box')
  // var fsbx = require('fsbx')

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
  if (app.arithmetics) instructions = app.arithmetics

  if (app.externals) {
    Object.keys(app.externals).forEach(external => instructions += ' -' + external)
  }

  // @TODO:
  // - [ ] improve
  // - [ ] check if last is /
  // if it does not have a `.` it might not be a full entry point
  if (typeof instructions === 'string' && !instructions.includes('.')) {
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

  // var realm = require('realm-utils')
  // realm.transpiler({
  //   preffix: 'test',
  //   base: 'test-app-backend',
  //   target: './test-backend.js',
  // }

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
      'transform-strip-flow-type',
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
  if (app.debug.fused) {
    helpers.log.text('💣  🛅  🏗 fuseboxed')

    if (app.debug.verbose) {
      helpers.log.verbose(app.fused)
      helpers.log.verbose(app.fusedConfig)
      helpers.log.verbose(babelConfig)
    }
  }

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
    // arithmetices[name] = arithmetic
    arithmetices[name] = arithmetic.replace('.js', '').replace('.ts', '')
    arithmetices[name] = arithmetices[name].replace('.js', '')
    arithmetices[name] = arithmetices[name].replace('.ts', '')


    // arithmetices[name] = arithmetic.replace('.js', '.ts')

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

  // var babelPlugin = fsbx.BabelPlugin({config})
  const {FuseBox, BabelPlugin} = require('fsbx')

  loaders = [
    BabelPlugin({config}),
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
  // if (appLoaders.svg) loaders.push(fsbx.SVGPlugin(appLoaders.svg))
  // if (appLoaders.css) loaders.push(fsbx.CSSPlugin(appLoaders.css))
  // if (appLoaders.babel && !helpers.isArithmetic(app.instructions)) {
  //   loaders.push(babelPlugin)
  // }
  // if (appLoaders.tsjs) {
  //   loaders.unshift([babelPlugin, new JSTS({helpers, babelPlugin})])
  // }

  if (app.fuseboxPlugins) loaders = app.fuseboxPlugins
  // if (app.fuseboxPluginConfigs) {
  //   loaders = []
  //   // @TODO: handle
  //   // if (typeof app.fuseboxPluginConfigs === 'object')
  //   app.fuseboxPluginConfigs.forEach(pluginName => {
  //     var FusePlugin = fsbx[pluginName.toUpperCase() + 'Plugin']
  //     var config = app.fuseboxPluginConfigs[pluginName]
  //     if (FusePlugin) {
  //       loaders.push(FusePlugin(config))
  //     }
  //   })
  // }

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
    var fuse = new FuseBox(params)

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
