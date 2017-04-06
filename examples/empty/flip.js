const {FlipHub, log} = require('fliphub')

class On {
  decorate(context, bundler, workflow) {
    let output = bundler.config.get('output')
    output = output.replace('index', context.name)
    bundler.config.set('output', output)
  }
}

const flips = new FlipHub({
  root: __dirname,
  presets: {
    on: new On(),
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
