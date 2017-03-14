// https://webpack.js.org/configuration/externals/#externals
module.exports = function({context, app, helpers}) {
  if (app.externals) {
    context.builder.config.externals = app.externals
  }

  return app
}
