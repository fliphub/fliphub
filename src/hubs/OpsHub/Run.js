// @TODO: this can use context outFile?
function staticDevServer({config}) {
  const {express, server, listen} = basicDevServer()
  server.use('/', express.static(config.dist))
}

function basicDevServer() {
  const express = require('express')
  const server = express()

  server.set('port', 4444)

  function listen() {
    server.listen(server.get('port'), function(error) {
      var location = `http://localhost:${server.get('port')}/`
      console.log(location)
    })
  }

  return {express, server, listen}
}
