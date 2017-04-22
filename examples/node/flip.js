const {FlipHub, log} = require('fliphub')

const apps = [
  {
    name: 'basic-node',
    presets: {
      'web': null,
      'aliasResolve': null,
      'aliasRequire': {
        dir: 'aliases/',
        files: ['moose'],
      },
    },

    entry: 'src/back/index.js',
    output: 'dist/[name].js',
  },
]

const flips = new FlipHub({
  root: __dirname,
  apps,
})

// log.quick(flips.setup(), flips.toConfig())
flips.build()
