const log = require('./src/lib/log')
const exec = require('child_process').exec
const execSync = require('child_process').execSync

/**
 * build:app:dev
 * build:app:devp
 * build:app:prod
 *
 * compile:app:dev
 * compile:app:dev:webpack
 * compile:app:dev:fusebox
 *
 * run:app:dev
 * run:app:prod
 * run:app:devp
 *
 * release:app:test
 * release:app:heroku
 * release:app:s3
 */
function s(script, options = {}) {
  var defaults = {
    node: 'node',
  }
  options = Object.assign(defaults, options)
  var {env, debug} = options
  if (debug) log({options, env})

  // SOLVE=d4 mocks=undefined npm_lifecycle_event=run node ./back/solver.js --color --progress --harmony --max_old_space_size=8000

  var decorated = `${script}`
  if (decorated.includes('--config')) {
  // if (decorated.includes('webpack')) {
    decorated = `npm_lifecycle_event=build ` + decorated + ' --color --progress'
  }
  else {
    // @TODO: should flags go before script?
    decorated = `${options.node} ` + decorated
    decorated = decorated + ' --harmony --max_old_space_size=8000'
    // decorated = `npm_lifecycle_event=run ` + decorated
  }
  if (env) {
    decorated = env + ' ' + decorated
  }

  return decorated
}

class Scripty {
  buildPackageJSON() {
    // var pkg = require('./package.json')
    // log(pkg.scripts)
  }

  // @TODO: take in commander options, add to script env
  optionsToEnv() {

  }

  constructor() {
    this.buildPackageJSON()
    this.nodePath = null
  }
  findNodePath() {
    // simpler with `process.env.NODE`
    // exec('node commander.js --harmony -e --help', puts)
    return new Promise(resolve => {
      exec('npm config get prefix', (error, stdout) => {
        this.nodePath = stdout.replace('\n', '') + '/bin/node'
        resolve(this.nodePath)
      })
    })
  }

  x(script, options = {}) {
    var cmd = s(script, options)
    var cb = options.cb
    var debug = options.debug
    if (debug) log(cmd, {level: 'running script'})
    return execSync(cmd, {stdio: 'inherit'})
  }

  // @TODO: append the servers in decorator
  build(name, {p, d}) {
    return this.x(`servers=${name} ${d} webpack --config ./back/webpack.mediator.js ${p}`)
  }
  compile(name, {p, d}) {
    var env = `servers=${name} compile=${name} ${d} ${p}`
    return this.x(`./back/webpack.mediator.js`, {env})
  }
  serve({system, mocks}, {p, d}) {
    log('serving', {level: 'commander', color: 'white'})

    // this.x(`${this.nodePath} ./back/server.js --env.servers=${names}`)

    // return this.x(`./back/server.js`, {env: `${d} servers=${system} mocks=${mocks} run=true`})
    return this.x(`./back/webpack.mediator.js`, {env: `${d} servers=${system} mocks=${mocks} run=true`})
  }
}

module.exports = {
  Scripty,
  log,
  execSync,
  exec,
}
