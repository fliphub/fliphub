var apps = require('./apps')
var FlipBox = require('../../../src')

var filters = FlipBox.flags('servers', {type: 'arr'})
var run = FlipBox.flags('run', {type: 'bool'})

var builder = new FlipBox({
  apps,
  filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['basic', 'intermediate'],
  debug: {
    filter: true,
  },
})
builder
.extendPresets({
  'inferno': {
    loaders: ['styleloader'],
    alias: ['moose', 'igloo', 'inferno'],
    html: '#root',
  },
})
.addDefaults({
  happypack: {
    threads: 4,
    include: [
      './',
    ],
  },
})

builder.build()
if (run) builder.devServer()
else builder.compile()

module.exports = builder.mediator()
