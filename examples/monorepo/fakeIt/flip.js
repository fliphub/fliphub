const timer = require('fliptime')
const log = require('fliplog')
timer.start('babeling')

// require('depflip/check')
// require('depflip/check')(require.resolve('fliphub2'))
const resolve = eh => require('path').resolve(__dirname, eh)

const FlipHub = require('fliphub2')
const flips = new FlipHub({
  root: __dirname,
  // debug: '!args,!has,!add',
  // debug: '!has,!add',
  debug: ['!add'],
  presets: [
    // 'defaults-env',
    // 'neutrino',
    // // 'neutrino-preset-node',
    // 'neutrino-preset-happypack',
    // 'defaults-rollup',
    // 'typescript',
    'defaults-env',
    // 'babel',
  ],
  // presetArgs: {
  //   'library': {
  //     // thisWillSayInvalid: 'nope!',
  //     include: ['**', '**/**'],
  //   },
  // },
  apps: [
    // {
    //   presets: [
    //     'defaults-env',
    //     'neutrino',
    //     'neutrino-preset-happypack',
    //     'typescript',
    //   ],
    //   name: 'ts',
    //   // entry: './test',
    //   entry: './yuge/packages/mockable/index.ts',
    //   // entry: './yuge/packages/mockable',
    //   // entry: '/Users/james/code/fliphub/packages/fliphub2/yuge/packages/mockable/index.ts',
    //   flips: {
    //     // from: 'webpack',
    //     // to: 'rollup',
    //     to: 'fusebox',
    //   },
    // },
    {
      name: 'neutrinos',
      presets: {
        'neutrino': null,
        'neutrino-preset-happypack': null,
      },
      entry: './fakeit/index.js',
      output: {
        path: './dist',
      },
    },
    {
      name: 'fuses',
      flips: {to: 'fusebox'},
      entry: './fakeit/index.js',
    },
    {
      presets: [
        'defaults-rollup',
        'flags',
      ],
      presetArgs: {
        'library': {
          // thisWillSayInvalid: 'nope!',
          include: ['**', '**/**'],
        },
      },
      name: 'eh',
      entry: './fakeit/index.js',
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
// // const built = flips.ops.build()
// const built = flips.ops.buildFast()
// // const built = flips.ops.buildSync(['neutrinos', 'fuses', 'eh'])
//
// // log.data(configs).text('toConfig').verbose(true).echo()
// timer.stop('babeling')
