// @TODO:
// - [ ] either compile here,
// - [ ] or use `that` context to require?
function exec(app, helpers) {
}

function staticServerMiddleware(currentApp, app, helpers) {
  var express = require('express')
  // @TODO:
  // var html = helpers.resolve('./src/front/index.html')
  var html
  if (Array.isArray(app.html) && app.html[0]) {
    html = helpers.resolve(app.html[0].template)
  } else if (app.html && app.html.template) {
    html = helpers.resolve(app.html.template)
  } else if (app.html) {
    html = helpers.resolve(app.html)
  } else {
    html = helpers.resolve('./src/front/index.html')
  }

  // var html = helpers.resolve('./src/front/index.html')
  helpers.log(html, {color: 'red', level: 'html_fuse'})
  // app.outFolder
  currentApp.use(express.static('dist'))
  currentApp.get('/', function(req, res) {
    res.sendFile(html)
  })

  return currentApp
}

function staticDevServer(app, helpers) {
  var express = require('express')
  var currentApp = express()
  staticServerMiddleware(currentApp, app, helpers)

  currentApp.set('port', 3333)
  currentApp.listen(currentApp.get('port'), function(error) {
    var location = `http://localhost:${currentApp.get('port')}/`
    console.log(location)
  })

  // @TODO: inject scripts here
  currentApp.use((res, req, next) => {
    console.log('requested....')
    // helpers.file.write('./dist/middlewares.txt', req)
    next()
  })

  return currentApp
}

function coreDevServer(app, helpers) {
  // var fused = app.fuser()
  // fused.devServer(full.fusedConfig.instructions, {
  //   port: 8080,
  //   httpServer: false,
  //   emitter: (self, fileInfo) => {
  //     console.log({fileInfo}, '____')
  //     // self.socketServer.send('source-changed', fileInfo)
  //   },
  // })
}

function compile(app, helpers) {
  var fused = app.fuser()
  return new Promise((resolve, reject) => {
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

function fuseboxCommander(app, helpers) {
  helpers.log(app.homeDir, 'homeDir')
  helpers.log(app.outFile, 'outFile')
  helpers.log(app.fusedConfig, 'fusedConfig')
  helpers.log(app.rootDir, 'rootDir')
  helpers.log(app.contextDir, 'contextDir')
  helpers.log(app.entry, 'entry')
  helpers.log(app.entryAbs, 'entryAbs')
  helpers.log(app.homeToEntry, 'homeToEntry')
  helpers.log(app.fusedConfig, 'instructions')
}

fuseboxCommander.compile = compile
fuseboxCommander.staticDevServer = staticDevServer
fuseboxCommander.exec = exec
fuseboxCommander.staticServerMiddleware = staticServerMiddleware

module.exports = fuseboxCommander
