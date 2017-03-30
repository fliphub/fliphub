const program = require('commander')
const pkg = require('./package.json')
const {execSync, spawnSync} = require('child_process')
const execSyncStd = (cmd) => execSync(cmd, {stdio: 'inherit'})
const {fs, path, write, tryJSON, addTogithugnore} = require('./zfliphub-cli/helpers')
const Commanderer = require('./zfliphub-cli/Commanderer')

// exec in child_process, capture the buffer output, assign to var
const npmBin = execSync('npm bin').toString().replace(/\n/gmi, '')
const lerna = `${npmBin}/lerna`
let lernaLog = '--loglevel="verbose"'

// const tsc = `${npmBin}/tsc`;
// const scope = '--scope="inferno"';
// const scope = '--scope="+(inferno|inferno-devtools)"';
// const lexec = '../../node_modules/.bin/tsc';
function lernaExec(node_module) {
  return '../../node_modules/.bin/' + node_module
}
function binFor(node_module) {
  return require.resolve(node_module)
  return npmBin + '/' + node_module
}


// "test:bench": "node test/karma/bench.js",
// "test:browser": "karma start test/karma/karma.unit.conf.js --log-level debug",
// "test:publish": "coveralls < coverage/lcov.info && rimraf coverage",
// "test:quick": "cross-env mocha",
function envFor(name, val) {

}
function flagFor(name, val) {
  return `--${name}="${val}"`
}
function prefixer(prefix, apps) {
  return apps.map(name => {
    if (!name.includes(prefix)) {
      name = prefix + '-' + name
    }
    return name
  })
}
function toGlob(apps) {
  return '+(' + apps.join('|') + ')'
}
function globFlag(prefix, apps) {
  apps = apps.split(',')
  apps = prefixer(prefix, apps)
  apps = toGlob(apps)
  return apps
}
function scope(apps) {
  if (apps) {
    apps = globFlag('inferno', apps)
    const flag = flagFor('scope', apps)
    return flag
  }
  return ''
}
function cmdFor({cmd, flags, env}) {
  const nodeFlags = ' --harmony --max_old_space_size=8000'
  return `${env} ${cmd} ${flags}`
}
function scriptFor(cmd, flags) {
  return cmdFor({
    env: '',
    cmd: binFor(cmd),
    flags,
  })
}
function runScriptFor(cmd, flags) {
  const script = scriptFor(cmd, flags)
  console.log(script)
  execSyncStd(script)
}
// const cross_env = 'cross-env'
// const cross_env = binFor(`cross-env`)
const cross_env = ''
function node_env(env) {
  return `${cross_env} NODE_ENV=${env}`
}
const browser_env = node_env('browser')
const dev_env = node_env('development')
const prod_env = node_env('production')


program
  .version(pkg.version)
  .command('[apps]')
  .option('-c, --clean', 'runs clean')
  .option('-t, --test', 'tests')
  .option('-n, --bench', 'benchmark')
  .option('-p, --production', 'use production env')
  .option('-d, --development', 'use development env')
  .option('-l, --lint', 'do linting')
  .option('-s, --server', 'use server')
  .option('-b, --build', 'build packages')
  .action(function(apps, options) {
  })

program
.command('no-name-needed-just-flags')
.option('-c, --clean', 'runs clean')
.option('-t, --test', 'tests')
.option('-n, --bench', 'benchmark')
.option('-p, --production', 'use production env')
.option('-d, --development', 'use development env')
.option('-l, --lint', 'do linting')
.option('-s, --server', 'use server')
.option('-b, --build', 'build packages')
.action(function(apps, options) {
})

// https:// github.com/tj/commander.js/#custom-help
program.on('--help', () => {
  Commanderer.init(__dirname + '/flip.js').allHelp(program)
})


// @TODO: extract flags elsewhere?

program
  //  [apps]
  .command('clean')
  .option('-p, --purge', 'removes node modules')
  .option('-r, --reinstall', 'reinstall')
  .action(function(options) {
    runScriptFor('rfimraf', 'coverage/ packages/*/dist*/')
    if (options.purge) {
      runScriptFor('rimraf', 'node_modules')
    }
    if (options.reinstall) {
      execSyncStd('npm i')
    }
  })

program
.command('bench [apps]')
.action(function(apps, options) {
  const scoped = scope(apps)
  let env = ''
  if (scoped) {
    apps = globFlag('inferno', apps)
    const globbed = `BENCHMARK_GLOB="packages/${apps}/__benchmarks__/**/*.js*"`
    return execSyncStd(globbed + ' npm run test:bench ')
  }
})

program
  .command('test [apps]')
  .option('-b, --browsers', 'browser')
  .option('-p, --production', 'use production env')
  .option('-d, --development', 'use development env')
  .option('-C, --chrome', 'karma.Chrome')
  .option('-I, --ie', 'karma.IE')
  .option('-F, --ff', 'karma.firefox')
  .option('-k, --karma', 'karma')
  .option('-q, --quick', 'test quick')
  .option('-f, --filter, --apps', 'filter / apps to use')
  .option('-s, --server', 'use the server tests')
  .option('-c, --coverage', 'test the coverage for publish with coveralls , --publish, --coveralls')
  .action(function(apps, options) {
    const {karma, chrome, ie, ff, quick, filter, server, coverage, production, development} = options
    let {browsers} = options
    const hasBrowsers = (ff || chrome || ie)
    if (!browsers && hasBrowsers) {
      browsers = ``
      if (ff) browsers += 'FireFox,'
      if (ie) browsers += 'IE,'
      if (chrome) browsers += 'Chrome,'
      browsers = browsers.slice(0, browsers.length - 1)
    }

    const scoped = scope(apps)
    let env = 'NODE_ENV=' + production ? 'production' : 'development'
    if (scoped) {
      apps = globFlag('inferno', apps)
      const globbed = `PKG_FILTER="${apps}" `
      env += globbed
    }




    if (browsers) {
      browsers.split(',').forEach(browser => {
        execSyncStd(env + 'npm run karma:' + browser.toLowerCase())
        // runScriptFor('karma', 'start test/karma/karma.unit.conf.js --browsers=' + browsers)
      })
    }
    else if (karma) {
      execSyncStd(env + 'npm run karma:all')
    }
    if (quick) {
      execSyncStd(env + 'npm run test:quick')
    }
    if (server) {
      execSyncStd(env + 'npm run test:server')
    }
    if (coverage) {
      execSyncStd(env + 'npm run test:publish')
    }
  })

program
.command('browser [apps]')
.action(function(apps, options) {
  runScriptFor('webpack-dev-server', '--config config/webpack.dev.conf.js')
})

program
.command('lint')
.option('-j, --js, --javascript', 'lint js')
.option('-t, --ts, --typescript', 'lint ts')
.action(function(options) {
  const {javascript, typescript} = options
  if (javascript)
    execSyncStd('npm run lint:js')
  if (typescript)
    execSyncStd('npm run lint:ts')
})

program
  .command('build [apps]')
  .option('-b, --browser', 'build for browser')
  .option('-p, --production', 'build for prod')
  .option('-d, --development', 'build for dev')
  .option('-l, --log', 'log output')
  // .option('-s, --scope', 'scope for packages')
  .action(function(name, options) {
    const tsc = lernaExec('tsc')
    const rollup = '../../bin/rollup'
    const named = name || options.scope
    const scoped = scope(named)
    // const lernad = 'lerna'
    const lernad = lerna

    // console.log(pkg)
    const tmpScripts = {
      ['flip:lerna:scoped:prod:' + named]: `${prod_env} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}`,
      ['flip:lerna:scoped:dev:' + named]: `${browser_env} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}`,
      ['flip:lerna:scoped:browser:' + named]: `${dev_env} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}`,
    }
    pkg.scripts = Object.assign(pkg.scripts, tmpScripts)
    execSyncStd(`${lerna} exec ${lernaLog} ${scoped} -- ${tsc}`)
    Object.values(tmpScripts).forEach(script => {
      execSyncStd(script)
    })
  })

program
  .command('preset [name]')
  .action(function(name, options) {
    Presets.parse(name)
  })


const inquirer = require('inquirer')
function checkboxPresets(name, apps, options) {
  const choices = {
    view: [
      new inquirer.Separator(' ==== Testing ==== '),
      new inquirer.Separator(' => Server (server with jsdom)'),
      // ...
      {
        name: 'mocha',
        value: 'test.mocha',
        checked: true,
      },
      {
        name: 'chrome',
        value: 'test.browser.chrome',
        checked: true,
      },
      {
        name: 'firefox',
        value: 'test.browser.firefox',
        checked: true,
      },
      {
        name: 'ie',
        value: 'test.browser.ie',
        checked: true,
      },
      new inquirer.Separator(' => Browser '),
      {
        name: 'dev server (webpack dev server)',
        value: 'test.browser.devserver',
        checked: false,
      },
			// {
			// 	name: 'karma (browsers with jsdom)',
			// 	value: 'karma',
			// 	checked: true,
			// },
      new inquirer.Separator(' = Bench = '),
      // @TODO: make this toggle automatically?
      {
        name: 'before tests',
        value: 'bench.before',
        checked: false,
				// disabled: true,
      },
      {
        name: 'after tests',
        value: 'bench.after',
        checked: true,
      },

      // before each test? needs thought...
      new inquirer.Separator(' = Build (before tests) = '),
      {
        name: 'production',
        value: 'build.production',
        checked: true,
      },
      {
        name: 'development',
        value: 'build.development',
        checked: true,
      },
      {
        name: 'browser',
        value: 'build.browser',
        checked: true,
      },
      new inquirer.Separator(' = Cleaning (before tests) = '),
      {
        name: 'dists (clean built before tests)',
        value: 'clean.node_modules',
        checked: false,
      },
      {
        name: 'node_modules',
        value: 'clean.node_modules',
        checked: false,
      },
      {
        name: 'uninstall (all packages node_modules)',
        value: 'clean.uninstall',
        checked: false,
      },
      {
        name: 'reinstall',
        value: 'clean.reinstall',
        checked: false,

        // @TODO:
        when: (answers) => {
          answers['clean.uninstall'] !== false
        },
      },

      new inquirer.Separator(' = Lint = '),
      // @TODO: make this toggle automatically?
      {
        name: 'js',
        value: 'lint.js',
        checked: false,
      },
      {
        name: 'ts',
        value: 'lint.ts',
        checked: false,
      },
    ],
  }

  const steps = [
    {
      type: 'checkbox',
      name: 'presets',
      message: 'options:',
      choices: choices.view,
      default: false,
    },
  ]
  inquirer.prompt(steps).then(answers => {
    answers.name = name
    answers.apps = apps
    const preset = JSON.stringify(answers, null, 2)
    console.log(preset)
    write('./.fliphub/' + name + '.json', preset)
  })
}

function interactivePresets(name, options) {}

program
  .command('make-preset [name] [apps]')
  .option('-c, --checkbox', '(default) use checkbox mode')
  .option('-i, --interactive', 'use interactive mode')
  .action(function(name, apps, opts) {
    addTogithugnore('.fliphub')
    if (opts.interactive) {
      return interactivePresets(name, apps, opts)
    }
    checkboxPresets(name, apps, opts)
  })

program.parse(process.argv)
