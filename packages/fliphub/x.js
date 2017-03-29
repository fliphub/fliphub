const timer = require('fliptime')
const log = require('fliplog')
timer.start('babeling')

const FlipHub = require('./src/core/FlipBox')
const flips = new FlipHub({
  root: __dirname,
  presets: [
    'defaults-env',
    'neutrino',
    // 'neutrino-preset-node',
    'neutrino-preset-happypack',
    'defaults-rollup',
  ],
  // presets: ['defaults-env', 'defaults-rollup'],
  // presets: ['defaults-env'],
  apps: [
    {
      name: 'eh',
      entry: './example.js',
      flips: {
        from: 'webpack',
        // to: 'rollup',
        // to: 'fusebox',
      },
    },
  ],
})

// .apps([{
//   name: 'eh',
//   entry: './example.js',
// }])
//
// .use('presetname', {config})
// .presetname(config)
//
// .app({
//   entry: './example.js',
//
//   // then you can say `from: unified`
//   unified: {}
//
//   flips: {
//     name: 'eh',
//     from: 'rollup',
//     to: 'fusebox',
//     presets: ['eh']
//   }
//
//   // add presets for handling a unified interface as in the article...
//   config: {
//
//
//   }
// })

// flips.flip(['eh']).from('rollup').to('fusebox')

const setup = flips.setup()
const configs = flips.toConfig()
const built = flips.ops.build()

// log.data(api).verbose().echo()
// log.data(flips).text('flips').verbose().echo()
log.data(configs).text('toConfig').verbose(true).echo()
timer.stop('babeling')
// .log('babeling')
