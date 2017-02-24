var webpack = require('webpack')
var babelLoaderBuilder = require('babel-loader-builder')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')
var pathToResolveTo = path.join(__dirname, '../../')
var resolve = resolvee => path.resolve(pathToResolveTo, resolvee)

var babelLoader = babelLoaderBuilder({
  async: true,
  moduleExports: true,
  asObject: true,
})
var config = {
  devtool: '#source-map',
  entry: {
    'ds-renderer': [
      resolve('./src/renderer/index.js'),
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
        loaders: 'babel-loader',
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
    alias: {},
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['tmp/dev', 'dist']),
    new CopyWebpackPlugin([
      {from: resolve('./src/renderer/assets'), to: 'assets', force: true},
    ]),
  ],
}

if (process.env.NODE_ENV) {
  var uglify = new webpack.optimize.UglifyJsPlugin(uglify)
  config.plugins.push(uglify)
}

module.exports = config
