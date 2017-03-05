/**
 * @TODO:
 * - [ ] build out package.json scripts with this :o
 * - [ ] https://github.com/tj/commander.js/#variadic-arguments
 *
 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JSAPI_reference/JS_THREADSAFE
 *
 */
const program = require('commander')
const {Scripty, exec, execSync} = require('./lib/scripty')
const scripty = new Scripty()

// @NOTE: emulate webpack
// process.argv.push('bin/webpack')
// var mediated = require('./example/configs/flipbox/mediator')
// console.log(mediated)
// var flipbox = require('./dist/flipbox')
// console.log(flipbox)
// require('./example/configs/flipbox/mediator')

// @TODO:
// - [ ] AND DO THINGS LIKE SET LOADERS TO USE IF WANTED
// - [ ] log when trying to run an app that doesn't exist
// - [ ] ADD ALL DEBUG OPTIONS IN HERE
// - [ ] run only if it has a port or require
program
  .version('0.0.1')
  .option('-c, --compile', 'compile and build using node api')
  .option('-C, --cache', 'cache or no cache')
  .option('-F, --fuseboxalias', 'use fusebox + fusebox aliases')
  .option('-f, --fusebox', 'use fusebox')
  .option('-w, --webpack', 'use webpack')
  .option('-wb, --wbuild', 'build using webpack cli')
  .option('-e, --exec', 'execute the compiled version')
  .option('-r, --run', 'run servers')
  .option('-p, --production', 'production mode')
  .option('-P, --devprod', 'run production in development')
  .option('-d, --debug', 'debug / dev mode')
  .option('-r, --release', 'release an app')
  .option('-m, --mock', 'release mock (test / emulate) mode')
  .option('-t, --test', 'run tests')
  .option('-T, --notest', 'run without tests')
  .option('-l, --loaders', 'pick loaders to use')
  .option('-sm, --sourcemaps', 'choose a type of sourcemap')
program
  .command('[system]')
  .action(function(name, options) {
    var use = ''
    if (options.webpack) use = 'webpack=true'
    else if (options.fusebox) use = 'fusebox=true'
    if (options.fuseboxalias) use = 'fusebox=true fuseboxa=true'

    if (options.cache) use += ' cache=true'
    if (options.exec) use += ' exec=true'

    var p = typeof prod != 'undefined' ? ' -p ' : ''
    var d = typeof debug != 'undefined' ? `NODE_ENV=DEVELOPMENT DEBUG="1" ` : ''
    var env = `servers=${name} compile=true ${d} ${p} ${use}`
    return scripty.x(`./back/webpack.mediator.js`, {env})
  })

// build package registry
// write to disk
// program
//   .command('release [name]')
//   .option('-m, --mock', 'release mock (test / emulate) mode')
//   .action(function(name, options) {
//   })

// program
//   .command('test [names]')
//   .action(function(names, options) {
//   })
//
// program
//   .command('build [names]')
//   .action(function(names, options) {
//     var d = '', p = ''
//     scripty.build(names, {p, d})
//   })

// program
//   .command('run [names]')
//   .action(function(names, options) {
//     var d = '', p = ''
//     // scripty.x('./dist/generateInletRegistry.js')
//     var env = {env: `${d} servers=${names} INIT=${names} EXEC="./dist/generateInletRegistry.js"`}
//     // return scripty.x(`./back/solver.js`, env)
//     return scripty.x(`./back/webpack.mediator.js`, env)
//   })

// https:// github.com/tj/commander.js/#custom-help
program.on('--help', () => {
  var o = {
    debug: false,
  }

  // console.log(program)

  var helpLog = {text: true, color: 'italic', space: 0}
  var helpMsg = {text: true, color: 'underline'}

  // scripty.x('com.js ds --help', o)
  // log('', {color: 'cyan', level: 'test'})
  // scripty.x('com.js test --help', o)
  // log('', {color: 'cyan', level: 'release'})
  // scripty.x('com.js release --help', o)
  //
  // log('@TODO:', {color: 'yellow', level: 'stream'})
  // log('@TODO:', {color: 'yellow', level: 'exec'})
  // log('@TODO:', {color: 'yellow', level: 'run'})
  // log('@TODO:', {color: 'yellow', level: 'build'})
  //
  // var helpS = {text: true, color: 'italic'}
  // console.log('\n')
  // log('🏃  run the demo', helpMsg)
  //
  // log('node flip it', {
  //   text: true,
  //   color: 'bold.italic',
  //   space: 1,
  // })
})

module.exports = program
