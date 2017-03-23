// require('../../modules/monono')

const FlipHub = require('./src/core/FlipBox')
// const FlipHub = require('./dist/fliphub2')
// const FlipHub = require('./dist/index.js.js')
// const FlipHub = require('./build/index.js.js')
const log = require('fliplog')
const json = require('rollup-plugin-json')
const flip = new FlipHub({
  root: __dirname,
  apps: [
    {
      presets: [
        'defaults-rollup',
        'flags',
      ],
      presetArgs: {
        'library': {
          include: ['**', '**/**', '!node_modules/fuse-box'],
        },
      },
      name: 'eh',
      entry: './src/index.js',
      flips: {
        // from: 'webpack',
        to: 'rollup',
        // to: 'fusebox',
      },
      external: [
        'fuse-box',
        'fsbx',
        'stylus',
        'vue',
        'node_modules/fuse-box',
        'node_modules/fsbx',
        require.resolve('fuse-box'),
        require.resolve('fsbx'),
        require.resolve('babel-core'),
        require.resolve('ejs'),
      ],
      plugins: [
        json({
          // All JSON files will be parsed by default,
          // but you can also specifically include/exclude files
          include: '**',  // Default: undefined
          // exclude: ['node_modules/foo/**', 'node_modules/bar/**'],  // Default: undefined
        }),
      ],
    },
    // {
    //   name: 'fliphub2',
    //   flips: {to: 'webpack'},
    //   presets: [
    //     'neutrino',
    //     'neutrino-preset-node',
    //   ],
    //
    //   target: 'node',
    //   entry: './src/index.js',
    //   output: 'dist/[name]',
    // },
    // {
    //   name: 'fliphub',
    //   flips: {to: 'fusebox'},
    //   entry: './src/index.js',
    //   output: 'dist/fliphub',
    // },
  ],
})

flip.setup()
log.data(flip.toConfig()).verbose().echo()
flip.ops.buildSync()
// flip.ops.buildFast()
