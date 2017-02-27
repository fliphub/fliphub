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
  let fused = app.fuser()
  let params = {}
  if (app.serverType === 'fusebox-custom')
    params = {
      port: 8080,
      httpServer: false,
      emitter: (self, fileInfo) => {
        console.log({fileInfo}, '____')
        // self.socketServer.send('source-changed', fileInfo)
      },
    }
  return fused.devServer(app.fusedConfig.instructions, params)
}
