/**
 * @TODO:
 * - [ ] build out package.json scripts with this :o
 * - [ ] https://github.com/tj/commander.js/#variadic-arguments
 *
 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JSAPI_reference/JS_THREADSAFE
 *
 */
const program = require('commander')
const {Scripty} = require('flipscript')
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
  // .option('-r, --release', 'release an app')
  .option('-m, --mock', 'release mock (test / emulate) mode')
  .option('-t, --test', 'run tests')
  .option('-T, --notest', 'run without tests')
  .option('-l, --loaders', 'pick loaders to use')
  .option('-sm, --sourcemaps', 'choose a type of sourcemap')
  .option('-config, --config', 'config location')
  // .option('-handler, --handler', 'location of config that contains flipbox instance to run?')
program
  .command('[system]')
  .action((name, options) => {
    let use = ''
    if (options.webpack) use = 'webpack=true'
    else if (options.fusebox) use = 'fusebox=true'
    // if (options.fuseboxalias) use = 'fusebox=true fuseboxa=true'

    if (options.cache) use += ' cache=true'
    if (options.exec) use += ' exec=true'
    if (options.config) use += ' config=' + options.config

    let p = typeof prod !== 'undefined' ? ' -p ' : ''
    let d = typeof debug !== 'undefined' ? `NODE_ENV=DEVELOPMENT ` : ''
    let env = `apps=${name} ${d} ${p} ${use}`
    return scripty.x(`./back/webpack.mediator.js`, {env})
  })

  .option('-bundle, --bundle', 'config location')

program
  .command('flipbox [config]')
  // .option('-config, --config', 'config location')
  .action((config, options) => {
    console.log('flipping', config)
    require('./CliFlip')(config)
  })
program
  .command('handler [config]')
  // .option('-config, --config', 'config location')
  .action((config, options) => {
    console.log('flipping with handler', config)
    require('./CliFlipHandler')(config)
  })

// build package registry
// write to disk
program
  .command('release [name]')
  .option('-m, --mock', 'release mock (test / emulate) mode')
  .action((name, options) => {})

program
  .command('publish [name]')
  // .option('-n, --names', 'publish to npm with multiple names')
  // .option('-N, --name', 'publish to npm with a single name')
  .option('-v, --version', 'publish to npm with a version already picked out')
  .action((names, options) => {
    if (names && names.includes(',')) names = names.split(',')
    else if (names) names = [names]
    else return console.log('must provide a name!')

    const Publisher = require('../ScriptHub/pkg/Publisher')
    const p = new Publisher()
    p.init()
    p.promtReleaseForNames(names)
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

program
  .command('fusebox-lang')
  .option('-i, --include', '+ adds a package / file')
  .option('-e, --exclude', '- excludes a package / file')
  .option('-c, --nocache', '^ disables the cache')
  .option('-a, --noapi', '! removes the wrapping fusebox')
  .option('-e, --execute', '> executes the index')
  .option('-b, --bundle', '[glob] bundles with no dependencies')
  .option('-g, --glob', '**/*, [**/*.js], http://www.globtester.com/')
  .action((name, options) => {
  })
program
  .command('fusebox-plugins')
  // make your own plugins -> docs
  // existing plugins -ls
  // command for name
  .action((name, options) => {
  })

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
