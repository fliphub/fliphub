/**
 * @TODO:
 * - [ ] build out package.json scripts with this :o
 * - [ ] https://github.com/tj/commander.js/#variadic-arguments
 *
 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JSAPI_reference/JS_THREADSAFE
 *
 */
const program = require('commander')
const {Scripty} = require('../../lib/scripty')
const scripty = new Scripty()

// @TODO:
// - [ ] AND DO THINGS LIKE SET LOADERS TO USE IF WANTED
// - [ ] log when trying to run an app that doesn't exist
// - [ ] ADD ALL DEBUG OPTIONS IN HERE
// - [ ] run only if it has a port or require
program
  .version('0.1.1')
  .option('-c, --compile', 'compile and build using node api')
  .option('-C, --cache', 'cache or no cache')
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
  .option('-config, --config', 'config location')
  // .option('-handler, --handler', 'location of config that contains flipbox instance to run?')
program
  .command('[system]')
  .action(function(name, options) {
    let use = ''
    if (options.webpack) use = 'webpack=true'
    else if (options.fusebox) use = 'fusebox=true'
    // if (options.fuseboxalias) use = 'fusebox=true fuseboxa=true'

    if (options.cache) use += ' cache=true'
    if (options.exec) use += ' exec=true'
    if (options.config) use += ' config=' + options.config

    var p = typeof prod != 'undefined' ? ' -p ' : ''
    var d = typeof debug != 'undefined' ? `NODE_ENV=DEVELOPMENT ` : ''
    var env = `apps=${name} ${d} ${p} ${use}`
    return scripty.x(`./back/webpack.mediator.js`, {env})
  })

  .option('-bundle, --bundle', 'config location')

program
  .command('flipbox [config]')
  // .option('-config, --config', 'config location')
  .action(function(config, options) {
    console.log('flipping', config)
    require('./CliFlip')(config)
  })
program
    .command('handler [config]')
    // .option('-config, --config', 'config location')
    .action(function(config, options) {
      console.log('flipping with handler', config)
      require('./CliFlipHandler')(config)
    })

// build package registry
// write to disk
program
  .command('release [name]')
  .option('-m, --mock', 'release mock (test / emulate) mode')
  .action(function(name, options) {
  })

// program
//   .command('test [names]')
//   .action(function(names, options) {})
// program
//   .command('compile [names]')
//   .action(function(names, options) {
//     var d = '', p = ''
//     scripty.build(names, {p, d})
//   })

// https:// github.com/tj/commander.js/#custom-help
program.on('--help', () => {
  const opts = {
    debug: false,
  }

  const helpLog = {text: true, color: 'italic'}
  const helpMsg = {text: true, color: 'underline'}

  console.text.color('test', 'cyan')
  scripty.x('flip flipbox --help', opts)

  console.text.color('release', 'cyan')
  scripty.x('flip release --help', opts)

  // log('@TODO:', {color: 'yellow', level: 'stream'})
  // log('@TODO:', {color: 'yellow', level: 'exec'})
  // log('@TODO:', {color: 'yellow', level: 'run'})
  // log('@TODO:', {color: 'yellow', level: 'build'})

  console.text('node flip it', {
    text: true,
    color: 'bold.italic',
    space: 1,
  })
})

module.exports = program
