module.exports = function getOutputPath(app) {
  if (app.outFile) return app.outFile
  var pathname = app.webpack.output.path
  var filename = app.webpack.output.filename
  var result = pathname + '/' + filename
  return result
}
