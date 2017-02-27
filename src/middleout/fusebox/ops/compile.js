// @TODO: split this up to make it not hard coded, more agnostic

class AbstractCompiler {
  constructor(appsContext) {

  }
}

class Compiler {
  compileApp(app) {

  }
}

function compile(options, helpers) {
  var {apps} = options
  var totalApps = apps.length
  var totalAppsCompiled = 0

  return new Promise(resolve => {
    apps.forEach(appConfig => {
      return helpers.fuseCommander
        .compile(appConfig, helpers)
        .then(({thisArg, compiled}) => {
          return resolve(apps, {thisArg, compiled})
        })
    })
  })
}

function compile(app, helpers) {
  return new Promise((resolve, reject) => {
    var fused = app.fuser()
    var bundled = fused.bundle(app.fusedConfig.instructions, () => {
      helpers.log('COMPILED', {color: 'blue'})
      if (app.compileEnd) app.compileEnd(app, helpers)

      var req
      if (app.exec) {
        if (app.polyfillWindow) require('jsdom-global')()

        // @TODO: with safety option
        try {
          req = require(app.outFile)
          if (app.debug.exec) helpers.log(req)
          if (app.debug.exec && app.debug.verbose) helpers.log.verbose(req)
        } catch (e) {
          helpers.log.error('COMPILATION_ERROR')
          helpers.log.verbose(e)
          req = e
        }
      }

      var thisArg = this
      var compiled = req
      return resolve({
        thisArg,
        bundled,
        app,
        helpers,
        compiled,
      })
    })
  })
}


module.exports = compile
