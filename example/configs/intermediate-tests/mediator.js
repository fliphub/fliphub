// https://github.com/webpack-contrib/karma-webpack

var apps = require('./apps')
var FlipBox = require('../../../src')

var builder = new FlipBox({
  apps,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  debug: {
    verbose: true,
    filter: true,
  },
})

builder.build()

builder.compile().then(() => {
  builder.auto()
})

module.exports = builder.mediator()
