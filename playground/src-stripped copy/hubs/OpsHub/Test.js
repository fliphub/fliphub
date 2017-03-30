var testRunners = require('../middleware/testing')

// https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
// https://medium.com/caffeine-and-testing/testing-react-example-mocha-expect-enzyme-jsdom-and-webpack-e3eef674f476#.38wfbbjjw
// https://www.npmjs.com/package/mocha-jsdom
// https://wallabyjs.com/docs/index.html
function testRunner(apps, helpers) {
  var output = {}
  var logOutput = false
  apps.forEach(app => {
    if (app.params.target === 'web') require('jsdom-global')()
    var outputPath = helpers.getOutputPath(app)
    helpers.log(outputPath, {level: '🏃  🔬  running tests for built output path:'})
    if (app.debug.testOutput) logOutput = true
    var contents = helpers.file.read(outputPath, helpers)
    // contents = contents.replace(/"use strict"/gmi, '')
    // var sillyStrict = '/"' + 'u' + 's' + 'e' + ' ' + 'strict' + '"/'
    // var replaceStrict = new RegExp(sillyStrict, 'gmi')
    // contents = contents.replace(replaceStrict, '')
    helpers.file.write(outputPath, contents)
    if (app.testingSuite === 'mocha')
      output[app.name] = testRunners.mocha(outputPath, helpers)
    else if (app.testingSuite === 'karma')
      output[app.name] = testRunners.karma(outputPath, helpers)
  })

  if (logOutput) {
    // helpers.log.verbose(output)
    helpers.log.text('🔬  test output')
  }
  return output
}

// var npmRun = require('npm-run')
// var cmd = `npm-run mocha --require source-map-support/register ` + outputPath
// {stdio: 'inherit'}
// output[app.name] = execSync(cmd)
// --debug-brk --sort
//
// var cmd = 'mocha --require testSetup.js ' + outputPath
//  --require source-map-support/register --reporter progress -d --trace-deprecation -
// var runnercb = function(failures) {
//   process.on('exit', function() {
//     console.log(failures)
//     // process.exit(failures)  // exit with non-zero status if there were failures
//   })
// }
// ------
// var cmd = 'mocha ' + outputPath + ' --no-exit --full-trace --harmony '
// var args = {cwd: global._dirname}
// var stdout = npmRun.execSync(cmd, args)
// ------
// var args = {cwd: __dirname}
// var stdout = npmRun.execSync(
//   'mocha --require source-map-support/register ' + outputPath,
//   // {cwd: __dirname + '/tests'}
// )
// output[app.name] = stdout

module.exports = testRunner
