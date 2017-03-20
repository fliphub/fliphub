const webpack = require('webpack')
const babelLoaderBuilder = require('babel-loader-builder')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const pathToResolveTo = path.join(__dirname, './pixi')
const resolve = resolvee => path.resolve(pathToResolveTo, resolvee)
const resolveHere = resolvee => path.resolve(__dirname, resolvee)

const babelLoader = babelLoaderBuilder({
  async: true,
  moduleExports: true,
  asObject: true,
})
const config = {
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
  const uglify = new webpack.optimize.UglifyJsPlugin(uglify)
  config.plugins.push(uglify)
}

module.exports = config
