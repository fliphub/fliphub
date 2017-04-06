const {FlipHub, log} = require('fliphub')

const apps = [
  {
    name: 'how-canada-was-named',
    presets: {
      'babel': null,
      'aliasResolve': null,
      'aliasRequire': {
        dir: './aliases/',
        files: ['moose', 'igloo'],
      },
    },

    // @TODO:
    // annoying dealing with this as an index as fusebox uses context.name...
    flips: {
      // to: 'fusebox',
      to: 'rollup',
    },

    target: 'node',
    entry: './src/canadas/index.js',
    output: {
      path: './src/canadas/dist',
      filename: '[name].js',
      libraryTarget: 'this',
    },
  },
]

const flips = new FlipHub({
  root: __dirname,
  apps,
})

flips.setup()
// log.quick(flips.toConfig())
flips
.build()
.then(() => {
  require('./src/canadas/run')
})
