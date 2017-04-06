const { FlipHub, log } = require('fliphub');
const eslint = require('../../.eslintrc.js');

const flip = new FlipHub({
  root: __dirname,
  apps: [
    {
      presets: {
        flags: null,
        eslint,
        neutrinoPresetNode: null,
      },
      flips: {
        to: ['rollup', 'fusebox', 'webpack'],
      },
      name: 'lints',
      entry: './src/index.js',
      output: './dist/eslint',
    },
  ],
});

flip.setup();
log.text('toconfig').data(flip.toConfig()).verbose().echo();
flip.ops.buildSync();
// flip.ops.buildFast()


// const FlipHub = require('fliphub')
// const eslint = require('../../.eslintrc.js')
//
// new FlipHub({
//   presets: {eslint},
//   name: 'lints',
//   entry: './src/index.js',
//   output: './dist/[name].js',
//   on: FlipHub.on('production', {flips: {to: 'rollup'}}),
// }).build()
