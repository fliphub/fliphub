const apps = [
  {
    name: 'canadas',
    compile: true,
    compileEnd: () => require('../../src/canadas/run.js'),
    fusebox: true,
    // babel: {env: ["node": "current"]},
    // babel: {env: true},
    loaders: {
      babel: {
        config: {
          presets: ['env'],
        },
      },
    },
    // fuseboxAlias: true,
    presets: ['node'],
    entry: './src/canadas/index.js',
    outFile: './src/canadas/dist/canadasbundle.js',
  },
]

const FlipBox = require('./flipbox')
const builder = new FlipBox({
  root: __dirname,
  apps,
  aliasDir: './aliases/',
  debug: {
    verbose: true,
    filter: true,
  },
})

builder.fullAuto()
require('../../src/canadas/run.js')
module.exports = builder.mediator()
