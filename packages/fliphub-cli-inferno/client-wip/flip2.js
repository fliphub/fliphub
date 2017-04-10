/* eslint-disable */

/**
 * @TODO:
 *  - [ ] should have config for when last built
 *  - [ ] flipcache should check when last built etc
 */
const pkg = require('./package.json');
const {
  CLI,
  log,
  flipscript,
  flipcache,
} = require('../src');

const {ScriptFlip} = flipscript
const cli = new CLI()
const program = cli.program()
const scripts = new ScriptFlip().debug(true)

program
  .command('lint [packages]')
  .option('-j, --js', 'lint js')
  .option('-t, --ts', 'lint ts')
  .option('-p, --production', 'use production env (should not need to be here)')
  .option('-d, --development', 'use development env (should not need to be here)')
  .action(function ({packages, options}) {
    const {js, ts} = options

    return scripts
      .stdout()
      .when(js, s => s.npm('lint:js'))
      .when(ts, s => s.npm('lint:ts'))
      .run()
  });

program
  .command('build [packages]')
  .option('-n, --nobuild', 'no build')
  .option('-b, --browser', 'build for browser')
  .option('-p, --production', 'build for prod')
  .option('-d, --development', 'build for dev')
  .option('-l, --log', 'log output')
  .option('-s, --silent', 'no log output @TODO')
  .option('-r, --rollup', 'rollup')
  .option('-f, --fusebox', 'fusebox')
  .option('-t, --ts', 'typescript')
  .action(function ({packages, options}) {
	  const { scope } = options

    return scripts
      .add()
      // .env('production')
      // .raw('lerna')
      .lerna()
      .raw('exec')
      // .prefix('inferno')
      // .scope(packages)
      // .log('info')
      // .concurrency(1)
      .group(2)
      .raw('--')
      .raw('node')

      // @TODO:
      .raw('../../node_modules/.bin/tsc')
      .run()
})

program
  .command('bench [packages]')
  .option('-l, --log', 'logLevel')
  .option('-a, --after', 'after tests')
  .option('-b, --before', 'before tests')
  .option('-b, --browser', 'build for browser')
  .option('-p, --production', 'build for prod')
  .option('-d, --development', 'build for dev')
  .action(function (args, cb) {
    const {options, packages} = args
    const {production, development} = options

    return scripts
      .npm('test:bench')
      .prefix('inferno')
      .globEnvAndFlag('scope', packages, {prefix: true})
      .when(production, s => s.env('production'))
      .when(development, s => s.env('development'))
      .run()
  });

 program
  .command('clean')
  .option('-p, --purge', 'removes node modules')
  .option('-r, --reinstall', 'reinstall')
  .option('-d, --dist', 'remove coverage/ and dist files (default)')
  .option('-l, --lerna', 'use lerna clean')
  .action(function ({options}) {
    const {lerna, purge, reinstall} = options

    return scripts
      .add()
      .bin('rimraf')
      .raw('coverage/ packages/*/dist*/')
      .when(lerna, s => s.add().bin('lerna').raw('clean'))
      .when(purge, s => s.add().bin('rimraf').raw('node_modules'))
      .when(reinstall, s => s.add().bin('npm').raw('i'))
      .run()
  });


program
  .use(scripts)
  .parseEnv()
  .show()
