const {FlipHub, log} = require('fliphub')

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
    // 'defaults-env',
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
    //   name: 'neutrinos',
    //   presets: {
    //     'neutrino-preset-happypack': null,
    //   },
    //   entry: './src/index.js',
    //   // output: {
    //   //   path: './dist',
    //   //   filename: '[name].js',
    //   // },
    //   output: './dist/[name].js',
    // },
    {
      name: 'fuses',
      flips: {to: 'fusebox'},
      entry: './src/index.js',
      output: './dist/$name.js',
    },
    // {
    //   flips: {
    //     to: 'rollup',
    //   },
    //   name: 'rollups',
    //   presetArgs: {
    //     'library': {
    //       include: ['**', '**/**'],
    //     },
    //   },
    //   entry: './src/[index].js',
    //   output: './dist/rollup.js',
    //   // treeshake: false,
    // },
  ],
})

const setup = flips.setup()
const configs = flips.toConfig()
// log.quick(configs)
// // const built = flips.ops.build()
// const built = flips.ops.buildFast()
// // const built = flips.ops.buildSync(['neutrinos', 'fuses', 'eh'])
//
// // log.data(configs).text('toConfig').verbose(true).echo()
// timer.stop('babeling')
// flips.buildSync()
flips.buildFast()
