var webpack = require('webpack')
var path = require('path')
var resolve = (resolvee) => path.resolve(__dirname, resolvee)
// ^ ensure that is correct
console.log(__dirname)

var alias = {
  // resolve this path to root
  'pixijs': resolve('./node_modules/pixi.js/dist/pixi.min.js'),
}
var babelInclude = [
  resolve('./src/game.js'),
  alias['pixijs'],
]

var config = {
  entry: resolve('./src/game.js'),
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
  },
  resolve: {
    alias,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: babelInclude,

        // you'll need a babelrc file if you need to use this
        loader: 'babel-loader',
      },
    ],
  },
}

console.log(config)
module.exports = config
