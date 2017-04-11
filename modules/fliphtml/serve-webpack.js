const {join} = require('path')
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const historyAPIFallback = require('express-history-api-fallback')

const app = express()
const config = {}
const compiler = webpack(config)
const devMiddlewareConf = {
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
  },
  publicPath: config.output.publicPath,
}

app.use(devMiddleware(compiler, devMiddlewareConf))
app.use(historyAPIFallback())
app.use(express.static(join(__dirname, 'backup')))

const port = app.get('port') || 3001
app.listen(port, (err) => {
  if (err) console.error(err)
  console.log('Server started: http://localhost:' + port)
})
