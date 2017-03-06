var webpack = require('webpack')
var babelLoaderBuilder = require('babel-loader-builder')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var path = require('path')
var pathToResolveTo = path.join(__dirname, './pixi')
var resolve = resolvee => path.resolve(pathToResolveTo, resolvee)
var resolveHere = resolvee => path.resolve(__dirname, resolvee)

var babelLoader = babelLoaderBuilder({
  async: true,
  moduleExports: true,
  asObject: true,
})
var config = {
  devtool: '#source-map',
  entry: {
    'eh': [
      resolve('./src/game.js'),
    ],
  },
  output: {
    path: resolve('./dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: babelLoader,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  resolve: {
    alias: {
      'pixijs': resolveHere('./apps.js'),
    },
  },
  externals: {
    'pixijs': 'pixijs',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['tmp/dev', 'dist']),
  ],
}

if (process.env.NODE_ENV) {
  var uglify = new webpack.optimize.UglifyJsPlugin(uglify)
  config.plugins.push(uglify)
}

module.exports = config
