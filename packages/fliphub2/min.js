// const resolver1 = require('fliphub-helpers/src/resolve').setRoot('YOOOO')
// const resolver = require('fliphub-helpers/src/resolve').resolve('./')
// const resolver2 = require('fliphub-helpers/src/resolve').debug()
// const rooter = require('fliphub-helpers/rooter/index.js')

const timer = require('fliptime')
const log = require('fliplog')
timer.start('babeling')
// const timer = require('fliphub-helpers/src/timer')
// const flags = require('fliphub-helpers/src/flags')
// timer.start('calling flags')
// const envs = flags('--env')
// const found = flags('nonExistantForAllCases')
// console.log(envs, found)
// timer.stop('calling flags').log('calling flags')
// timer.logLaps('flagger')
// require('babel-register')

const DefaultsEnv = require('./src/presets/DefaultsEnv')
const PresetNeutrino = require('./src/presets/PresetNeutrino')
const PresetDefaultsRollup = require('./src/presets/DefaultsRollup')

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
flips.presets().add('defaults-env', new DefaultsEnv)
flips.presets().add('neutrino', new PresetNeutrino)
flips.presets().add('defaults-rollup', new PresetDefaultsRollup)

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
