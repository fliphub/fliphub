/**
 * @TODO:
 *  - [ ] should have config for when last built
 *  - [ ] flipcache should check when last built etc
 *  - [ ] fix glob
 *  - [ ] add option to run concurrent or in sync
 */
const pkg = require('./package.json')
const {
  CLI,
  log,
  flipscript,
  flipcache,
  toarr,
} = require('../src')

const {ScriptFlip, Flag, flipglob, prefixer} = flipscript
const cli = new CLI()
const program = cli.program()
const scripts = new ScriptFlip().debug(true).stdout()

// bind inferno as the first arg
const prefixs = prefixer.bind(null, 'inferno')

function getBrowsers(opts) {
  let {browsers} = opts
  if (browsers) return browsers

  const {chrome, ie, ff} = opts

  if (!chrome && !ie && !ff) return false

  browsers = ''
  if (ff) browsers += 'Firefox,'
  if (ie) browsers += 'IE,'
  if (chrome) browsers += 'Chrome,'
  browsers = browsers.slice(0, browsers.length - 1)

  return  browsers
}

function handleTest(packages, opts) {
  const {filter, server, coverage, nyc} = opts
  let browsers = getBrowsers(opts)

  // @TODO: use `prefixs` here?
  const addScripts = (names) => names.forEach(name => {
    scripts
      .npm(name)
      .prefix('inferno')
      .globEnvAndFlag('PKG_FILTER', packages, {prefix: true})
  })

  scripts
    .when(coverage, () => scripts.npm('test:publish'))
    .when((!server && !coverage && !browsers), () => {
      addScripts(['karma:chrome', 'karma:firefox', 'karma:ie', 'mocha'])
    })
    .when(server, () => {
      filterMochaOpts(packages)
      scripts.add().bin('mocha')
    })
    .when(browsers, () => {
      // also could do
      toarr(browsers).forEach(browser => {
  			scripts
          .add()
          .bin('karma')
          .raw('start test/karma/karma.unit.conf.js')
          .flag('browsers', browsers)
          .prefix('inferno')
          .globEnvAndFlag('PKG_FILTER', packages, {prefix: true})
  		})
    })
}


const mochaFile = flipcache
  .from('./test/mocha.opts').end()
  .to('./.fliphub/mocha.opts').end()
  .dir(__dirname)

const infernoOpts = flipcache
  .from('./packages/inferno/src/core/options.ts').end()
  .to('./.fliphub/inferno-opts.ts').end()
  .dir(__dirname)

function flipRecycling() {
  infernoOpts
    .backup(10000)
    .autoRestore(10000)
}

function filterMochaOpts(packages) {
  // pop off the last one,
  // change it to our filer
  const filter = ScriptFlip
    .init()
    .add()
    .globArg(prefixs(packages), false)
    .toString()

  const from = mochaFile
    .backup(10000)
    .autoRestore(10000)
    .from()
      .load()
      .setContent(mochaFile
        .from()
        .contents
        .trim()
        .split('\n')
        .slice(0, -1)
        .join('\n'))
      .append(`packages/${filter}/__tests__/**/*.js*`)
      .write()
}


program
  .command('test [packages]')
  .option('-a, --all', 'all tests')
  .option('-b, --browsers', 'browser')
  .option('-C, --chrome', 'karma.Chrome')
  .option('-I, --ie', 'karma.IE')
  .option('-F, --ff', 'karma.firefox')
  .option('-q, --quick', 'test quick')
  .option('-s, --server', 'use the server tests')
  .option('-c, --coverage, --publish, --coveralls', 'test the coverage for publish with coveralls')
  .option('-n, --nyc', 'use nyc to check code coverage')
  .option('-p, --production', 'for prod env')
  .option('-d, --development', 'for dev env')
  .option('-r, --recycling', 'turns recycling on (default recycling is off)')
  .option('-o, --only', 'grep to run only tests matching this filter / grep')
  .option('-f, --filter', 'filter / packages to use (can be used when you grep)')
  .action(({options, packages}) => {
  	let {production, development} = options
  	if (!production && !development) production = true

    handleTest(packages, options)

    return scripts
      //
      // for each devMode, or autoEnv mode :-)
      //
      // should clone and run in dev + prod,
      // since we want to run both if needed,
      // which means I need to be careful with auto-defining env... -.-
      // .when(production, s => s.env('production'))
      // .when(development, s => s.env('development'))
      .run()
  })

program
  .use(scripts)
  .parseEnv()
  .show()
