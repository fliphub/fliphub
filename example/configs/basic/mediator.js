var apps = require('./apps')
var FlipBox = require('../../../src')

var filters = FlipBox.flags('servers', {type: 'arr'})
var builder = new FlipBox({
  apps,
  filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['basic'],
})

builder.fullAuto()
module.exports = builder.mediator()
