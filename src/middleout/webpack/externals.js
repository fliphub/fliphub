module.exports = function(app, helpers) {
  if (app.externals) {
    app.webpack.externals = app.externals
  }

  return app
}
