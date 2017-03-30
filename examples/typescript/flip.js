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
    typescript: require('./tsconfig.json'),
  },
  apps: [
    {
      name: 'typescript',
      entry: './src/index.ts',
      output: './dist/index.js',
      flips: {to: ['webpack', 'fusebox', 'rollup']},
    },
  ],
})

flips.buildSync()
// flips.buildFast()
