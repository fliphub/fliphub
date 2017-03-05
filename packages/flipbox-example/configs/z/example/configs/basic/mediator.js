const apps = require('./apps')
// var FlipBox = require('../../../src')
const FlipBox = require('../../../../core/FlipBox')

const filters = FlipBox.flags('servers', {type: 'arr'})
const builder = new FlipBox({
  apps,
  filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['basic'],
})

builder.fullAuto()
module.exports = builder.mediator()
