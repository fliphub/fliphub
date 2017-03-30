global.compile = true
global.devServer = true

const apps = require('./apps')
const FlipBox = require('../flipbox')

// const flags = FlipBox.flags
// const compile = flags('compile', {type: 'bool'})
// const run = flags('run', {type: 'bool'})
// const filters = flags('servers', {type: 'arr'})

const builder = new FlipBox({
  apps,
  // filters,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  defaultAppNames: ['intermediate', 'basic'],
  debug: {
    verbose: true,
    filter: true,
  },
})
// console.verbose(builder)

// builder
.addPresets({
  'verbose': {
    loaders: ['styleloader'],
    alias: ['moose', 'igloo', 'react'],
    html: '#root',
  },
})

// builder
.extendPresets({
  'inferno': {
    loaders: ['styleloader'],
    alias: ['moose', 'igloo', 'inferno'],
    html: '#root',
  },
})
// console.exit(builder)

// .addMiddlewares({
//   index: 999,
//   name: 'name',
//   inject(app, helpers) {
//     helpers.log.text('❗❗❗ MIDDLEWARE FOR PROPERTY .NAME WAS RUN!')
//     return app
//   },
// })

const builtApps = builder.build()
// console.log(builtApps)

// if (compile && run) {
//   builder.compile().then(() => builder.devServer())
// }
// else if (compile) builder.compile()
// else if (run) builder.devServer()

// module.exports = builder.mediator()
// module.exports = builder.mediator()
