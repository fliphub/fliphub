// / just require fliphub ha
// https://github.com/facebookincubator/create-react-app/pull/1742
const log = require('fliplog')
const FlipHub = require('./src')
const Hubs = require('./src/hubs')

log.spinner('eh oh')

const flips = new FlipHub({
  root: __dirname,
  presets: {
    flags: null,
    // resolveAll: __dirname,
  },
  apps: [{
    presets: {
      resolveAll: __dirname,
    },
    name: 'eh',
    flips: {
      to: 'fusebox',
    },

    entry: './src/index.js',
    output: './public/eh',
  }],
})

flips.setup()
const config = flips.toConfig()
// log.verbose(3).quick(config)
flips.build()
