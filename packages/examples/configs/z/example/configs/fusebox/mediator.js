var apps = require('./apps')
var FlipBox = require('../../../src')

var filters = ['fusebox']
var builder = new FlipBox({
  apps,
  filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['fusebox'],
})

builder.fullAuto()
module.exports = builder.mediator()
