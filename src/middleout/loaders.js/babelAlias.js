const BabelAlias = {
  test: app => app.babelAlias,
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

if (babelModuleAlias) {
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
