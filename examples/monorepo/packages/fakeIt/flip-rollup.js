// @TODO: rimraf remove
require('./generate')
const {FlipHub, log} = require('fliphub')

const flips = new FlipHub({
  root: __dirname,
  debug: ['!add'],
  apps: [
    {
      presetArgs: {
        'library': {
          include: ['**', '**/**'],
        },
      },
      name: 'eh',
      entry: './src/[index].js',
      flips: {
        to: 'rollup',
      },
    },
  ],
})

const setup = flips.setup()
const configs = flips.toConfig()
flips.build()
// log.quick(configs)
