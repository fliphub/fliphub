// https://github.com/webpack-contrib/karma-webpack

var apps = require('./apps')
var FlipBox = require('../../../src')

var builder = new FlipBox({
  root: global._dirname,
  apps,
  aliasDir: './configs/aliases/',
  debug: {
    verbose: true,
    filter: true,
  },
})

builder.fullAuto()
module.exports = builder.mediator()
