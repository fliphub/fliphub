// https://sungwoncho.io/run-multiple-apps-in-one-droplet/
// http://serverfault.com/questions/208656/routing-to-various-node-js-servers-on-same-machine
// @TODO: only require what is needed

var listeningTo = {}

function devServer(apps, helpers) {
  var express = require('express')
  var historyAPIFallback = require('connect-history-api-fallback')

  helpers.log('🏃  running dev servers', {color: 'green.italic', text: true})

  var devApps = {}
  apps.forEach(appConfig => {
    // so we only listen once
    if (listeningTo[appConfig.port]) return
    listeningTo[appConfig.port] = appConfig
    helpers.firstOpenPort(appConfig.port || 3333).then(port => {
      appConfig.port = port

      var webpackAppConfig = appConfig.webpack
      var currentApp = express()

      currentApp.set('port', appConfig.port)

      if (appConfig.fusebox) {
        helpers.log.text('USING DEVSERVER FUSE')
        if (appConfig.devServer === 'fusebox') {
          currentApp = helpers
            .fuseCommander
            .coreDevServer(appConfig, helpers)
        } else {
          currentApp = helpers
            .fuseCommander
            .staticServerMiddleware(currentApp, appConfig, helpers)
        }
        // helpers.log.verbose(currentApp)
      }
      else {
        currentApp.use(historyAPIFallback())
        currentApp.use(configFor(webpackAppConfig))
      }

      helpers.log(appConfig.name, {color: 'magenta'})

      // @TODO: time here
      currentApp.listen(currentApp.get('port'), function(error) {
        if (error) helpers.log(error, {color: 'redBg'})

        var location = `http://localhost:${currentApp.get('port')}/`
        var msg = `${helpers.log.bold(appConfig.name + '@')} `
        msg += helpers.log.underline(location)
        helpers.log('🏸  serving ' + msg, {text: true, color: 'green'})
      })

      devApps[appConfig.name] = currentApp
    })
  })
  return devApps
}

function configFor(aWebpackConfig) {
  var webpack = require('webpack')
  var devMiddleware = require('webpack-dev-middleware')
  var compiler = webpack(aWebpackConfig)
  return devMiddleware(compiler, {
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: true,
      color: true,
      colors: true,
      version: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: false,
    },
    publicPath: aWebpackConfig.output.publicPath,
  })
}

devServer.staticServer = staticDevServer

module.exports = devServer
