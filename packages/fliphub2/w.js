const log = require('fliplog')
const eslint = require('../../.eslintrc.js')
const FlipHub = require('./src/core/FlipBox')

const flip = new FlipHub({
  root: __dirname,
  debug: ['!has', '!add', '!config'],
  apps: [
    {
      presets: {
        flags: null,
        eslint,
        neutrino: null,
        resolveAll: null,
        neutrinoPresetNode: null,
      },
      name: 'lints',
      entry: './src/index.js',
      output: './dist/eslint',
    },
  ],
})

flip.setup()
log.text('toconfig').data(flip.toConfig()).verbose().echo()
flip.ops.build()
// flip.ops.buildSync()
// flip.ops.buildFast()
