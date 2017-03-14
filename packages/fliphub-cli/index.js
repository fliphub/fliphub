const program = require('commander')
const fsbx = require('../dist/commonjs/index')
const pkg = require('../package.json')
const {execSync} = require('child_process')
const execSyncStd = (cmd) => execSync(cmd, {stdio: 'inherit'})

// lerna --scope=inferno exec -- foo bar
// mocha packages/inferno/__tests__/**/*.js*
// save data to file

// interactive, or with flags
// default program, and with named programs
//
// clean
//   - reinstall
//   - purge
//   - uninstall
//
// ops
//   build
//     - ts
//   test
//      - all
//      - publish
//      - quick
//      - server
//     karma
//      - all
//      - chroma
//      - firefox
//      - ie
//     browser
//     bench
//
// env
//  - dev
//  - prod
//
// lint
//   - js
//   - ts
//   - all (default)


// "browser": "webpack-dev-server --config config/webpack.dev.conf.js",
// "build:packages": "lerna exec -- ../../node_modules/.bin/tsc",
// "build:browser": "cross-env NODE_ENV=browser lerna exec -- node ../../bin/rollup",
// "build:dev": "cross-env NODE_ENV=development lerna exec -- node ../../bin/rollup",
// "build:prod": "cross-env NODE_ENV=production lerna exec -- node ../../bin/rollup",
// "build": "npm run clean && npm run build:packages && npm run build:dev && npm run build:prod && npm run build:browser",
// "clean": "rimraf coverage/ packages/*/dist*/",
// "karma:all": "npm run karma:firefox && npm run karma:chrome && npm run karma:ie",
// "karma:chrome": "karma start test/karma/karma.unit.conf.js --browsers=Chrome",
// "karma:firefox": "karma start test/karma/karma.unit.conf.js --browsers=Firefox",
// "karma:ie": "karma start test/karma/karma.unit.conf.js --browsers=IE",
// "lint:js": "eslint config examples src packages/*/__tests__/*",
// "lint:ts": "tslint packages/*/src/*.ts",
// "lint": "npm run lint:ts && npm run lint:js",
// "packages:purge": "rimraf node_modules",
// "packages:reinstall": "npm run packages:purge && npm install",
// "postinstall": "lerna bootstrap && lerna exec --no-sort --concurrency 1 -- node ../../bin/link",
// "prepublish": "npm run build",
// "pretest:bench": "karma start test/karma/karma.bench.conf.js --log-level debug",
// "test:bench": "node test/karma/bench.js",
// "test:browser": "karma start test/karma/karma.unit.conf.js --log-level debug",
// "test:publish": "coveralls < coverage/lcov.info && rimraf coverage",
// "test:quick": "cross-env mocha",
// "tsc:dev": "lerna exec --no-sort --concurrency `ls -d packages/* | wc -l` -- tsc -w",
// "test:server": "cross-env nyc mocha",
// "test": "npm run lint && npm run build && npm run test:browser && npm run test:server",
// "uninstall": "rm -rf node_modules && lerna exec -- rm -rf node_modules"


program
  .version(pkg.version)

// const pluginProgram = program.command('plugins')
// pluginProgram.option('-d, --docs', 'documentation for the plugin')
//
// // dynamically add all plugins as options to the plugin command options
// for (const index in plugins) {
//   const pluginName = plugins[index]
//   // .replace('Plugin', '')
//   pluginProgram.option('--' + pluginName)
// }
//
// // make your own plugins -> docs
// // existing plugins -ls
// // command for name
// pluginProgram
//   .action(function(options) {
//     const {opts, keys} = getOpts(options)
//     keys.forEach(name => {
//       const Plugin = fsbx[name]
//       const plugin = Plugin()
//       const inspected = inspector(plugin)
//
//       if (options.all || options.code) {
//         let contents = codeFor('plugins/' + name + '.ts')
//         contents = inspector(contents.split('\n'))
//         console.log(contents)
//       }
//
//       log.echo(githubSrcFor(name))
//       log.echo(docsLinkFor(name))
//       log.echo(findDocsFor(name))
//       console.log(inspected)
//     })
//   })
//
// // https:// github.com/tj/commander.js/#custom-help
// program.on('--help', () => {
//   execSyncStd(`node ${__dirname + '/CommandLine'} arithmetics --help`)
//   execSyncStd(`node ${__dirname + '/CommandLine'} plugins --help`)
//   execSyncStd(`node ${__dirname + '/CommandLine'} fuse --help`)
// })

// program
//   .command('arithmetics')
//   // .alias('instructions')
//   .option('-i, --include', '+ adds a package / file')
//   .option('-e, --exclude, --ignore', '- excludes a package / file')
//   .option('-c, --cache', 'use caching (default)')
//   .option('-C, --nocache', '^ disables the cache')
//   .option('-a, --noapi', '! removes the wrapping fusebox')
//   .option('-x, --execute', '> executes the index')
//   .option('-b, --bundle', '[glob] bundles with no dependencies')
//   .option('-g, --glob', '**/*, [**/*.js], http://www.globtester.com/')
//   .option('-p, --parse', 'pass in a string, parse it (use quotes, --parse=\'magic here\')')
//   .action(function(name, options) {
//     console.log('eh?')
//   })


const Config = require('./ConfigGatherer')
const config = new Config(fsbx)

program
  .command('step')
  .action(function(name, options) {
    config.stepper()
  })

program.parse(process.argv)






const inquirer = require('inquirer')
class Builder {
  constructor(fsbx) {
    this.config = {}
    this.Fluent = fsbx.Fluent
    this.gatherer = new Gatherer()
  }

  stepper() {
    this.gatherer.stepper()
  }
  init() {
    this.gatherer.init()
  }
}

// @TODO: connect to github api
const availableDemos = {
  react: ['react-seed'],
}
const demos = Object.keys(availableDemos)
const hasDemo = (view) => demos.forEach(demo => demo.includes(view))

const choices = {
  view: [
    new inquirer.Separator(' = View / Presentation = '),
    {
      name: 'React',
      value: 'react',
    },
    {
      name: 'Inferno',
      value: 'inferno',
    },
    {
      name: 'Vue',
      value: 'vue',
    },
    {
      name: 'Angular',
      value: 'angular',
    },
    {
      // input...
      name: 'Other',
      value: 'other',
    },
  ],

  target: [
    // if browser, ask about inline svg and html, and styles
    new inquirer.Separator(' = Environment? ='),
    {
      name: 'Server',
      value: 'server',
      checked: true,
    },
    {
      name: 'Browser',
      value: 'browser',
      checked: true,
    },
    {
      name: 'Electron',
      value: 'electron',
    },
    // {
    //   name: "HotReloading",
    //   value: "hmr",
    //   checked: true,
    // },
  ],

  exporting: [
    {
      type: 'confirm',
      name: 'exporting',
      message: 'Exporting anything?',
      default: false,
    },
    {
      type: 'input',
      name: 'pkgname',
      message: 'Package name?',
      when: answers => answers.exporting,
      // default: false,
    },
    {
      type: 'input',
      name: 'pkgname',
      message: 'modules to export?',
      default: '*',
      when: answers => answers.exporting,
    },
  ],

  env: [
    new inquirer.Separator(' = Production? = '),
    {
      name: 'DefinePlugin',
      checked: true,
    },
    {
      name: 'Uglify',
      checked: true,
    },
    {
      name: 'SourceMaps',
      checked: true,
    },
  ],

  syntax: [
    new inquirer.Separator(' = Syntax? = '),
    {
      name: 'TypeScript',
      value: 'ts',
      checked: true,
    },
    {
      name: 'Babel es6',
      value: 'babel',
    },
    {
      name: 'None - es5',
      value: 'es5',
    },
    {
      name: 'CoffeeScript',
      value: 'cs',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ],
}

const _steps = {
  aliases: {
    type: 'confirm',
    name: 'aliases',
    message: 'Do you use aliases?',
    default: false,
  },
  target: {
    type: 'checkbox',
    name: 'target',
    message: 'Target env(s)?',
    choices: choices.target,
  },
  syntax: {
    type: 'checkbox',
    name: 'syntax',
    message: 'Syntax used?',
    choices: choices.syntax,
  },
  bundles: {
    // then go to their names...
    // and go to alias interactive...
    // and save the data in case they exit...
    // and ask if they want to resume...
    type: 'confirm',
    name: 'bundles',
    message: 'Multiple bundles?',
    default: false,
  },
  targetThenView: [
    {
      type: 'checkbox',
      name: 'target',
      message: 'Env target(s)?',
      choices: choices.target,
    },
    {
      type: 'list',
      name: 'view',
      message: 'View framework?',
      choices: choices.view,
      when: answers => answers.target.includes('browser'),
    },
    {
      type: 'confirm',
      message: 'Start with an existing demo?',
      name: 'downloaddemo',
      default: false,
      when: answers => true || hasDemo(answers.view),
    },
  ],
}

class Gatherer {
  stepper() {
    const steps = [
      _steps.targetThenView,
      _steps.aliases,
      choices.exporting,
      _steps.bundles,
      _steps.syntax,
    ]
    this.data = {}
    this.steps = steps
    this.indx = 0
    this.thenner()
  }

  thenner() {
    const steps = this.steps[this.indx]
    if (!steps) {
      console.log((this.data))
      return
    }
    if (steps.type === 'checkbox') steps.message += ' (use [spacebar])'
    inquirer.prompt(steps).then(answers => {
      Object.assign(this.data, answers)
      this.indx++
      setTimeout(() => this.thenner(), 1)
    })
  }
}

module.exports = Builder
