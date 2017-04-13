const {FlipHub, log} = require('fliphub')

const apps = [{
  name: 'nodes',
  target: 'node',
  presets: {
    'neutrino': null,
    // 'neutrino-preset-node': null,
    'alias-require': {
      dir: './aliases/',

      // these are in order of least important -> most important
      // think of it as a chain of Object.assigns
      files: ['moose', 'igloo'],
    },
  },
  flips: {from: 'webpack', to: 'fusebox'},
  entry: './src/back/index.js',
  output: './dists/name',
}]

new FlipHub({
  root: __dirname,
  apps,
}).build()

// const webpack = require('webpack')
// const compiler = webpack(configs)

// // eslint-disable-next-line consistent-return
// compiler.run((err, stats) => {
//   // eslint-disable-next-line no-console
//   console.log(stats.toString({
//     colors: true,
//     chunks: false,
//     children: false,
//   }))
// })
