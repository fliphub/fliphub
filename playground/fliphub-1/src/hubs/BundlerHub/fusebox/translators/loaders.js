const plugins = {
  'babel': 'BabelPlugin',
  'typescript': 'TypeScriptHelpers',
  'uglify': 'UglifyJSPlugin',
  'coffee': 'CoffeePlugin',
  'html': 'HTMLPlugin',
  'svg': 'SVGPlugin',
}
const files = {
  'js': 'babel',
  'svg': 'svg',
  'html': 'html',
  'cs': 'coffee',
  'coffee': 'coffee',
  'ts': 'typescript',
  // tsConfig: helpers.resolve(`./tsconfig.json`),
}

const FuseBoxLoaders = {
  decorate({context}) {
    // context.debugFor('loaders', '💣  builder is fusebox', 'green')

  },
  add({name, config, context, box}) {
    context.debugFor(['loaders', 'fusebox'], '💣  ⚖️  loaders', 'green', name)

    let plugin = context.builder.api[plugins[name]]
    if (!plugin) return context.debugFor(
      ['loaders', 'missing', 'fusebox'],
      '🔎  💣  ⚖️  loaders', 'green', name)

    // @TODO:
    // probably need an adapter for each *sigh*
    // just pass in the configs forget it...
    let pluginConfig = context.builder.plugins[name] || config
    if (name === 'babel' && !pluginConfig.config) pluginConfig = {
      config: pluginConfig,
    }

    plugin = plugin(pluginConfig)
    context.debugFor(['loaders', 'add', 'fusebox'],
      '✚  💣  ⚖️  loaders', 'green', name)
    context.builder.plugins.push(plugin)
  },
  forFile({file, context}) {
    if (files[file]) FuseBoxLoaders.add({name: files[file], context})
  },
}

// @TODO:
// - map with providePlugin
// - use subscribers in middleware to attach fuse or webpack loaders
//
// fsbx.EnvPlugin({NODE_ENV: 'production'}),
// http://fuse-box.org/#loader-plugins
// fsbx.UglifyJSPlugin(),
/**
 * shim: {
   "react-native-web": { exports: "require('react-native')"},
}
 */


// will handle webpack translate like provide plugin?
const FuseBoxPlugins = {
  // decorate({context}) {
  //   // context.debugFor('loaders', '💣  builder is fusebox', 'green')
  // },
  //
  // add({name, config, context}) {
  //   context.debugFor(['loaders', 'fusebox'], '💣⚖️  plugins', 'green', name)
  // },
}

module.exports = {FuseBoxLoaders, FuseBoxPlugins}


// var babelPlugin = fsbx.BabelPlugin({config})
// loaders = [
//   // babelPlugin,
//   // {
//   //   hmrUpdate: (evt) => true,
//   // },
//   // [babelPlugin, new AliasPlugin({helpers, aliases})],
//   // [new AliasPlugin({helpers, aliases})],
//   // fsbx.TypeScriptHelpers()
//   // [new AliasPlugin({helpers, aliases}), babelPlugin],
//   // new AliasPlugin({helpers, aliases, babelPlugin}),
//   // [new AliasPlugin({helpers, aliases}), fsbx.BabelPlugin({config}), fsbx.TypeScriptHelpers()],
//   // fsbx.TypeScriptHelpers(),
//   // fsbx.CoffeePlugin(),
//   // fsbx.HTMLPlugin(),
//   // [new JSTS({helpers}), fsbx.TypeScriptHelpers()],
//   // [fsbx.BabelPlugin({config: babelConfig}), new JSTS({helpers})],
//   // [babelPlugin, new JSTS({helpers, babelPlugin})],
//   // fsbx.JSONPlugin(),
// ]
//
//
// // var appLoaders = Object.keys(app.loaders)
// var appLoaders = app.loaders
// if (appLoaders.svg) loaders.push(fsbx.SVGPlugin(appLoaders.svg))
// if (appLoaders.css) loaders.push(fsbx.CSSPlugin(appLoaders.css))
// // if (appLoaders.babel && !helpers.isArithmetic(app.instructions)) {
// //   loaders.push(babelPlugin)
// // }
// if (appLoaders.tsjs) {
//   loaders.unshift([babelPlugin, new JSTS({helpers, babelPlugin})])
// }
//
// if (app.fuseboxPlugins) loaders = app.fuseboxPlugins
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
