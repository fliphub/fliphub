const apps = [
  {
    name: 'intermediate',
    port: 3103,
    presets: ['inferno'],
    entry: {
      demo: './src/front/index.js',
    },
  },
]
const FlipBox = require('../flipbox')
const builder = new FlipBox({
  apps,
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
