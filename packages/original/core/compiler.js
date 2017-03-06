// @TODO: split this up to make it not hard coded, more agnostic

function compile(options, helpers) {
  var {apps, onCompile, onCompileAll} = options
  var totalApps = apps.length
  var totalAppsCompiled = 0

  return new Promise(resolve => {
    apps.forEach(appConfig => {
      helpers.log(appConfig.name, '⌛  compiling')
      helpers.log.verbose(appConfig.webpack)
      if (appConfig.fusebox) {
        return helpers.fuseCommander
          .compile(appConfig, helpers)
          .then(({thisArg, compiled}) => {
            return resolve(apps, {thisArg, compiled})
          })
      }

      var webpack = require('webpack')
      var webpackAppConfig = appConfig.webpack
      var compiler = webpack(webpackAppConfig)

      if (appConfig.watch) {
        compiler.watch({}, (err, stats) => {
          if (appConfig.debug && stats)
            console.log(stats.toString({
              chunks: false,
              colors: true,
            }))
          resolve(apps)
          if (onCompile && typeof onCompile === 'function')
            onCompile(webpackAppConfig)
          else if (onCompile && onCompile[appConfig.name])
            onCompile[appConfig.name](webpackAppConfig)
          else if (appConfig.onCompile)
            appConfig.onCompile(webpackAppConfig, helpers)
          if (appConfig.compileEnd) appConfig.compileEnd(appConfig, helpers)
        })
      } else {
        compiler.run((err, stats) => {
          ++totalAppsCompiled
          if (appConfig.debug && stats)
            console.log(stats.toString({
              chunks: false,
              colors: true,
            }))

          if (onCompile && typeof onCompile === 'function')
            onCompile(webpackAppConfig)
          else if (onCompile && onCompile[appConfig.name])
            onCompile[appConfig.name](webpackAppConfig)

          if (totalAppsCompiled === totalApps) {
            helpers.log({totalAppsCompiled, totalApps}, '⌛  apps compiled')
            resolve(apps)
          }
        })
      }
    })
  })
}

module.exports = compile
