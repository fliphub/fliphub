const express = require('express')

const app = express()
// const webpack = require('webpack')
// const devMiddleware = require('webpack-dev-middleware')

// eslint-disable-next-line
console.log('starting dev server middleware....')
// const compiler = webpack(webpackConfig.default)
// const devMiddlewareConf = {
//   // It suppress error shown in console, so it has to be set to false.
//   quiet: false,
//   // It suppress everything except error, so it has to be set to false as well
//   // to see success build.
//   noInfo: false,
//   stats: {
//     // Config for minimal console.log mess.
//     assets: true,
//     colors: true,
//     version: true,
//     hash: true,
//     timings: true,
//     chunks: true,
//     chunkModules: false,
//   },
//   publicPath: webpackConfig.default.output.publicPath,
// }
const {join} = require('path')

// app.use(devMiddleware(compiler, devMiddlewareConf))
// app.use('static', express.static(join(__dirname, 'backup')))
// app.use('all', express.static(join(__dirname, './')))
// app.use('test', express.static(join(__dirname, 'test')))
// server.use(historyAPIFallback())

console.log(join(__dirname, 'backup'))
app.use(express.static(join(__dirname, 'backup')))

const port = app.get('port') || 3001
app.listen(port, (err) => {
  if (err) console.error(err)
  console.log('Server started: http://localhost:' + port)
})
