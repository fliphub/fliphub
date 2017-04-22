// @TODO: this can use context outFile?

const log = require('fliplog')

function basicDevServer() {
  const express = require('express')
  const server = express()

  function listen(port = 3333) {
    server.listen(server.get('port') || port, (error) => {
      if (error) console.log(error)
      console.log(`http://localhost:${server.get('port')}/`)
    })
  }

  const set = (name = 'port', port = 3454) => {
    server.set(name, port)
    return server
  }

  return {express, server, listen, set}
}

function staticDevServer(config) {
  const {express, server, listen} = basicDevServer()
  server.use('/', express.static(config.dist))
  return server
}

staticDevServer({dist: 'outputhere'}).listen(3454)

module.exports = {
  staticDevServer,
  basicDevServer,
}


// https://sungwoncho.io/run-multiple-apps-in-one-droplet/
// http://serverfault.com/questions/208656/routing-to-various-node-js-servers-on-same-machine

class Server {
  // devServer: {
  //   contentBase: path.join(__dirname, "dev"),
  //   compress: true,
  //   port: 9000
  // }
}

class StaticServer {
}

class DevServer {
  webpackDevMiddleware(config) {
    const webpack = require('webpack')
    const devMiddleware = require('webpack-dev-middleware')

    const compiler = webpack(config)
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
      publicPath: config.output.publicPath,
    })
  }

  server(config, context) {
    const express = require('express')
    const historyAPIFallback = require('connect-history-api-fallback')

    log
      .emoji('run')
      .color('green.italic')
      .text('running dev servers')
      .echo()

    new Promise(resolve => resolve(3000)).then(port => {
      // context.ops.server.portUsed = port

      const server = express()
      server.set('port', port)
      server.use(historyAPIFallback())
      server.use(this.webpackDevMiddleware({config, api}))
      // context.ops.server.middleware.forEach(middleware => server.use(middleware))

      server.listen(server.get('port'), (error) => {
        if (error) log.catch(error)

        log
          .emoji('serve')
          .bold(context.name)
          .echo()

        log
          .underline(`http://localhost:${server.get('port')}/`)
          .echo()
      })
    })
  }

  start(config) { return this.server(config) }
}


class Runner {
  constructor() {
    this.staticServer = new StaticServer()
    this.devServer = new DevServer()
  }
  handle(config, context) {
    const instance = this.devServer.start(config, context)

    // process._exit('runner fusebox')
  }
}

module.exports = Runner
