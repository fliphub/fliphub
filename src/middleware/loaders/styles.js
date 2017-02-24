module.exports = function(config, helpers) {
  var loader = {
    test: /\.css$/,
    loader: 'style-loader!css-loader',
  }
  return loader
}
