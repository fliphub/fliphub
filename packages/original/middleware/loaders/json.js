// https://webpack.js.org/guides/migrating/#json-loader-is-not-required-anymore
// just use for fusebox
module.exports = function(config, helpers) {
  var loader = {
    test: /\.json/,
    loader: 'json-loader',
  }
  return loader
}
