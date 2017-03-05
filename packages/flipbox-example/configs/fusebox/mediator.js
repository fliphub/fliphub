const apps = require('./apps')
const FlipBox = require('../flipbox')

const filters = ['fusebox']
const builder = new FlipBox({
  apps,
  filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['fusebox'],
})

builder.fullAuto()
module.exports = builder.mediator()
