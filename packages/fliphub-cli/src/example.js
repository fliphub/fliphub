/**
 * @TODO:
 * - [ ] build out package.json scripts with this :o
 * - [ ] https://github.com/tj/commander.js/#variadic-arguments
 *
 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JSAPI_reference/JS_THREADSAFE
 * https:// github.com/tj/commander.js/#custom-help
 */
const program = require('vorpal')
const FlipScript = require('flipscript')

program
  .command('onthefly [config]')

// build package registry
// write to disk
program
  .command('release [name]')
  .option('-m, --mock', 'release mock (test / emulate) mode')
  .action((name, options) => {})

program
  .command('publish <name>')
  .option('-v, --version', 'publish to npm with a version already picked out')
  .action((names, options) => {
    names = toarr(names)

    const Publisher = require('../ScriptHub/pkg/Publisher')
    const p = new Publisher()
    p.init()
    p.promtReleaseForNames(names)
  })


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
  .option('-m, --mock', 'release mock (test / emulate) mode')
  .option('-t, --test', 'run tests')
  .option('-T, --notest', 'run without tests')
  .option('-l, --loaders', 'pick loaders to use')
  .option('-p, --presets', 'pick presets to use')
  .option('-sm, --sourcemaps', 'choose a type of sourcemap')
  .option('-config, --config', 'config location')
  // .option('-handler, --handler', 'location of config that contains flipbox instance to run?')
  // .option('-r, --release', 'release an app')

module.exports = program
