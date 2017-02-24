global.compile = true
global.devServer = true

var apps = require('./apps')
var FlipBox = require('../../../src')

var flags = FlipBox.flags
var compile = flags('compile', {type: 'bool'})
var run = flags('run', {type: 'bool'})
var filters = flags('servers', {type: 'arr'})

var builder = new FlipBox({
  apps,
  filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['intermediate', 'basic'],
  debug: {
    verbose: true,
    filter: true,
  },
})
builder
.addPresets({
  'verbose': {
    loaders: ['styleloader'],
    alias: ['moose', 'igloo', 'react'],
    html: '#root',
  },
})
.extendPresets({
  'inferno': {
    loaders: ['styleloader'],
    alias: ['moose', 'igloo', 'inferno'],
    html: '#root',
  },
})
.addMiddlewares({
  index: 999,
  name: 'name',
  inject(app, helpers) {
    helpers.log.text('❗❗❗ MIDDLEWARE FOR PROPERTY .NAME WAS RUN!')
    return app
  },
})

var builtApps = builder.build()
// console.log(builtApps)

if (compile && run) {
  builder.compile().then(() => builder.devServer())
}
else if (compile) builder.compile()
else if (run) builder.devServer()

module.exports = builder.mediator()
