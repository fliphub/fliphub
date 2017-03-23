const apps = [{
  name: 'nodes',
  target: 'node',
  presets: {
    'neutrino': null,
    // 'neutrino-preset-node': null,
    'alias-resolve': __dirname,
    'alias-require': {
      dir: './aliases/',

      // these are in order of least important -> most important
      // think of it as a chain of Object.assigns
      files: ['moose', 'igloo'],
    },
  },
  flips: {from: 'webpack', to: 'fusebox'},
  entry: require('path').resolve(__dirname, './src/back/index.js'),
  output: require('path').resolve(__dirname, './dists/name'),
}]

const FlipHub = require('fliphub2')
const flips = new FlipHub({
  root: __dirname,
  apps,
})

const log = require('fliplog')
flips.setup()
const configs = flips.toConfig()
log.data(configs).verbose().echo()

flips.ops.build()
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
