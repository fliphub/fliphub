// https://sungwoncho.io/run-multiple-apps-in-one-droplet/
// http://serverfault.com/questions/208656/routing-to-various-node-js-servers-on-same-machine

const Config = require('../config/config')

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
  webpackDevMiddleware({config, api}) {
    const devMiddleware = require('webpack-dev-middleware')
    const compiler = api(config)
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

  server(args, {config}) {
    const {context, helpers} = args
    const {builder} = context
    const {api} = builder
    const express = require('express')
    const historyAPIFallback = require('connect-history-api-fallback')

    helpers.log('🏃  running dev servers', {color: 'green.italic', text: true})
    helpers.firstOpenPort(context.port || 3333).then(port => {
      // context.ops.server.portUsed = port

      const server = express()
      server.set('port', port)
      server.use(historyAPIFallback())
      server.use(this.webpackDevMiddleware({config, api}))
      context.ops.server.middleware.forEach(middleware => server.use(middleware))

      helpers.log(context.name, {color: 'magenta'})

      // @TODO: time here
      server.listen(server.get('port'), function(error) {
        if (error) console.exit(error)

        var location = `http://localhost:${server.get('port')}/`
        var msg = `${helpers.log.bold(context.name + '@')} `
        msg += helpers.log.underline(location)
        helpers.log('🏸  serving ' + msg, {text: true, color: 'green'})
      })
    })
  }

  start(args, config) { return this.server(args, config) }
}


class Runner {
  constructor() {
    this.staticServer = new StaticServer()
    this.devServer = new DevServer()
  }
  handle(args) {
    const {api, context} = args
    const config = Config.parse(args)
    const instance = this.devServer.start(args, {config})

    // process._exit('runner fusebox')
  }
}

module.exports = Runner
