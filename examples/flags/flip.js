const {FlipHub, log} = require('fliphub')

const flips = new FlipHub({
  root: __dirname,
  presets: {
    flags: {
      names: [
        {flag: 'env'},
        {flag: 'exec'},
        {flag: 'run'},
        {flag: 'test'},
      ],
      init() {},
      coreInit() {},
    },
    env: {
      production() {},
      development() {},
      default() {},
    },
    // when: FlipHub.whenEnv(process.env.NODE_ENV === 'production', () => {
    // }),
    // when: FlipHub.when(process.env.NODE_ENV === 'production', () => {
    // }),
  },
  apps: [
    {
      name: 'empty-es5',
      entry: './src/es5/empty.js',
      output: './dist/es5/index.js',
      flips: {to: ['rollup', 'webpack', 'fusebox']},
    },
    {
      name: 'empty-es6',
      entry: './src/es6/empty.js',
      output: './dist/es6/index.js',
      flips: {to: ['rollup', 'webpack', 'fusebox']},
    },
    {
      name: 'completely-empty',
      entry: './src/completely-empty.js',
      output: './dist/completely/index.js',
      flips: {to: ['rollup', 'webpack', 'fusebox']},
    },
  ],
})

flips.buildSync()
// flips.buildFast()
