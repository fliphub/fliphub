function staticDevServer() {
  var express = require('express')

  module.exports = function(dist) {
    var currentApp = express()
    currentApp.use('/', express.static(dist))

    currentApp.set('port', 4444)
    currentApp.listen(currentApp.get('port'), function(error) {
      var location = `http://localhost:${currentApp.get('port')}/`
      console.log(location)
    })
  }
}
