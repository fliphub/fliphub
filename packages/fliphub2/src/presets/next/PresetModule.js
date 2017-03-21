// so it would work for rollup and fusebox anyway
//
//
// moduleName: rollupConfig.moduleName || name,
// globals: Object.assign({moduleGlobal: rollupConfig.moduleGlobal}, rollupConfig.moduleGlobals),


return helpers.injectPlugins(app, new webpack.ProvidePlugin(app.provide))
