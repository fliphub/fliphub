const timer = require('fliptime')
const log = require('fliplog')
timer.start('babeling')

const resolve = eh => require('path').resolve(__dirname, eh)
const FlipHub = require('./src/core/FlipBox')
const flips = new FlipHub({
  root: __dirname,
  // debug: '!args,!has,!add',
  // debug: '!has,!add',
  debug: ['!add'],
  presets: [
    'defaults-env',
    'neutrino',
    // 'neutrino-preset-node',
    'neutrino-preset-happypack',
    'defaults-rollup',
    // 'typescript',
    'babel',
  ],
  presetArgs: {
    'library': {
      // thisWillSayInvalid: 'nope!',
      include: ['**', '**/**'],
    },
  },
  apps: [
    {
      presets: [
        'typescript',
      ],
      name: 'ts',
      // entry: './test',
      entry: './yuge/packages/mockable/index.ts',
      // entry: './yuge/packages/mockable',
      // entry: '/Users/james/code/fliphub/packages/fliphub2/yuge/packages/mockable/index.ts',
      flips: {
        // from: 'webpack',
        // to: 'rollup',
        to: 'fusebox',
      },
    },
    {
      name: 'eh',
      entry: './yuge/packages/mockablejs/index.js',
      flips: {
        // from: 'webpack',
        to: 'rollup',
        // to: 'fusebox',
      },
    },
  ],
})

const setup = flips.setup()
const configs = flips.toConfig()
const built = flips.ops.build()

log.data(configs).text('toConfig').verbose(true).echo()
timer.stop('babeling')
