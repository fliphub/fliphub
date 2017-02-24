var AppBuilder = require('./AppBuilder')
var makeHelpers = require('../lib')
var middlewares = require('../middleware')
var fuseCommander = require('./fuseCommander')

// for building [appS]
class AppsBuilder {
  constructor(config) {
    // for benchmarking / time reporting
    this.times = {
      start: Date.now(),
    }

    // @TODO: add better message
    if (!config) throw new Error('must pass in a config')
    var {
      aliasDir,
      root,
      debug,
    } = config
    this.debug = debug || false

    this.setApps(config.apps)
    this.setFilters(config.filters)
    this.setDefaultAppNames(config.defaultAppNames)

    this.helpers = makeHelpers({root, aliasDir})
    this.helpers.builder = this
    this.helpers.fuseCommander = fuseCommander
    this.setAppBuilder(config.appBuilder)

    if (config.presets) {
      this.addPresets(config.presets)
    }
    if (config.middleware) {
      this.addMiddlewares(config.middleware)
    }
  }

  // 1)
  // this can be used by passing in COMPILE=true
  // to compile with webpack on nodejs
  //
  // 2)
  // or it can be used by webpack
  // to pass in the name of your webpack preconfigured package
  // and the module exports is the decorated webpack config
  mediator() {
    var exportee = this.builtApps

    // if it is webpack cli,
    if (AppsBuilder.isWebpackCli) {
      if (this.builtApps && this.builtApps[0]) {
        exportee = this.builtApps[0].webpack
      }
    }

    return exportee
  }

  // the apps have already been filtered before building
  // so now we filter them down more based on what to do next
  fullAuto(options) {
    if (!options) options = {}
    if (!this.builtApps) this.build()

    if (AppsBuilder.isWebpackCli) {
      this.helpers.log.text('🕸  🛅  🖥  was webpack cli: fullAuto()')
      if (!options.force) return
    }

    var flag = this.helpers.flags.searchAll
    var shouldTest = flag('test', {type: 'bool'})
    var shouldRun = flag('run')
    var shouldCompile = flag('compile')
    var shouldExec = flag('exec')
    var shouldClean = flag('clean')
    this.builtApps.forEach(app => {
      if (app.test || app.tests) shouldTest = true
      if (app.run) shouldRun = true
      if (app.compile) shouldCompile = true
      if (app.exec) shouldExec = true
      if (app.fused) this.helpers.fuseCommander(app, this.helpers)
      // if (app.cache === false || app.fuser) shouldClean = true
    })
    this.helpers.log({
      shouldTest,
      shouldRun,
      shouldCompile,
      shouldExec,
      shouldClean,
    }, '━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)" fullAuto')

    var theRest = () => {
      if (shouldRun) {
        this.devServerIfNeeded()
      }
      if (shouldTest) {
        this.tests()
      }
      if (shouldExec) {
        this.exec()
      }
    }

    if (shouldClean) {
      this.cleanApps()
    }
    if (shouldCompile) {
      this.compile().then(theRest).catch(e => {
        console.log(e)
      })
    } else {
      theRest()
    }

    return this.mediator()
  }

  // @TODO:
  // - [ ] clean the cleaner hahaha
  // - [ ] fix this
  cleanApps(apps) {
    // if (!apps) apps = this.builtApps.filter(app => app.cache === false || app.fuser)
    // var names = builtApps.map(app => app.name)
    // this.helpers.log(names, {level: '🚮  apps for cleaning!', color: 'yellow'})
    // var rimraf = require('rimraf')
    // return
    // builtApps.forEach(appConfig => {
    //   rimraf.sync(appConfig.outDir)
    // })
    // rimraf.sync('../../../**/.happypack/**')
    // rimraf.sync('../../../**/.fusebox/**')
    // rimraf.sync('../../../**/.dist/**')
    // rimraf.sync('../../../**/dist/**')
  }

  // filter, if we haven't already
  tests(apps) {
    if (!apps) apps = this.builtApps.filter(app => app.test || app.tests)
    this.helpers.log(apps, {level: 'apps for testing!'})
    var testRunner = require('./testRunner')
    return testRunner(apps, this.helpers)
  }

  devServerIfNeeded(apps) {
    if (!apps) apps = this.builtApps.filter(app => app.run)
    if (!apps.length) return
    this.devServer(apps)
  }

  devServer(builtApps, options) {
    if (AppsBuilder.isWebpackCli) {
      this.helpers.log.text('🕸  🛅  🖥  was webpack cli: devServer()')
      if (!options) options = {}
      if (!options.force) return
    }

    var devServers = require('./devServer')
    devServers(builtApps || this.builtApps, this.helpers)
  }

  // @param ?Function || ?{appName: Function}
  // @return Promise
  compile(onCompile, options) {
    if (AppsBuilder.isWebpackCli) {
      this.helpers.log.text('🕸  🛅  🖥  was webpack cli: compile()')
      if (!options) options = {}
      if (!options.force) return
    }
    this.helpers.log.text('🖥  compile()')

    var compile = require('./compiler')
    var apps = this.builtApps
    return compile({apps, onCompile}, this.helpers)
  }

  // @TODO
  // - [ ] in specific order
  // - [ ] don't filter then loop, just check condition when looping
  exec(apps, options) {
    this.helpers.log.text('🖥  exec()')

    if (!apps) {
      apps = this.builtApps
      var filter = this.helpers.flags.searchAll('exec', {type: 'arr'})
      if (filter) apps = apps.filter(app => filter.includes(app.name) || app.exec)
      var required = {}
    }

    apps.forEach(app => {
      if (app.debug.exec)
        this.helpers.log(app.name, {level: 'exec for'})

      if (typeof app.exec === 'function') {
        required[app.name] = app.exec()
      }
      else {
        if (app.windowPolfyill) require('jsdom-global')()
        var result = this.helpers.getOutputPath(app)
        if (app.debug.exec)
          this.helpers.log(result, {level: 'exec for built output path:'})
        var exec = require(result)
        if (app.debug.exec)
          this.helpers.log(exec, {level: 'exec result:'})
        required[app.name] = exec
        if (typeof exec === 'function') exec()
      }
    })

    // if (apps.debug) this.helpers.log(required, {level: 'exec results:'})

    return required
  }

  // @param ?AppBuilder
  // @chainable
  setAppBuilder(appBuilder) {
    if (!appBuilder) {
      appBuilder = new AppBuilder({
        middlewares,
        helpers: this.helpers,
        addPresets: this.addedPresets,
        extendPresets: this.extendedPresets,
      })
    }

    this.appBuilder = appBuilder
    return this
  }

  // @param Array
  // @chainable
  setFilters(filters) {
    if (typeof filters === 'string') filters = [filters]
    this.filters = filters
    return this
  }

  // default app names used for filtering
  // @param Array
  // @chainable
  setDefaultAppNames(defaultAppNames) {
    this.defaultAppNames = defaultAppNames
    return this
  }

  // @TODO: a .reset
  reset() {}

  // defaults used for all apps
  // @param Object
  // @chainable
  addDefaults(defaults) {
    this.defaults = defaults
    this.helpers.defaults = defaults
    return this
  }
  // @param {keystring: {}}
  // @chainable
  addPresets(presets) {
    this.addedPresets = presets
    this.setAppBuilder()
    return this
  }
  // @param {keystring: {}}
  // @chainable
  extendPresets(presets) {
    this.extendedPresets = presets
    this.setAppBuilder()
    return this
  }
  // @TODO: remove middleware
  addMiddlewares(middlewareToAdd) {
    if (Array.isArray(middlewareToAdd)) {
      middlewareToAdd.forEach(m => middlewares = Object.assign(middlewares, m))
    }
    else if (typeof middlewareToAdd === 'object' && middlewareToAdd.name) {
      middlewareToAdd = {
        [middlewareToAdd.name]: middlewareToAdd,
      }
      middlewares = Object.assign(middlewares, middlewareToAdd)
    }
    this.setAppBuilder()
    return this
  }

  // @param Array
  // @chainable
  setApps(apps) {
    this.apps = apps
    return this
  }

  // @TODO: take out this hardcoded filter
  filter(apps, filters) {
    if (!apps) apps = this.apps
    if (!filters) filters = this.filters

    if (apps.debug && apps.debug.verbose) this.helpers.log(this, 'instance')
    var msg = {level: '☕  🏳️  filtering', color: 'blue'}

    if (filters) {
      if (typeof filters === 'function')
        apps = apps.filter(filters)
      else
        apps = apps.filter(appToCheck => filters.includes(appToCheck.name))
    } else if (this.defaultAppNames) {
      if (this.debug.filter) this.helpers.log('using defaultApps', msg)
      apps = apps.filter(appToCheck => this.defaultAppNames.includes(appToCheck.name))
    }
    // else no filtering

    var appNames = apps.map(({name}) => name)
    if (this.debug.filter) this.helpers.log({filters, appNames}, msg)
    return apps
  }

  // @TODO:
  // - [ ] option to autofix
  // - [ ] show which ones were duped
  validateApps(apps) {
    var outputPaths = []
    apps.forEach(app => {
      var result = this.helpers.getOutputPath(app)
      if (outputPaths.includes(result)) {
        this.helpers.log(result, {level: 'duplicate output paths'})
      }
      outputPaths.push(result)
    })
  }

  // Array in, Array out
  build(apps, filters) {
    // @TODO: else, error or warn
    if (!apps) apps = this.apps
    apps = this.filter(apps, filters)

    var builtApps = []
    apps.forEach(app => {
      this.helpers.log(app.name, {color: 'yellow', level: '👨‍🔧  ⌛  building: ' + app.name})

      var builtApp = this.appBuilder.build(app)
      // console.log(app)
      if (builtApp.debug.built) {
        this.helpers.log(app.webpack, {color: 'yellow', level: '🏗  built: ' + app.name})
      }

      builtApps.push(builtApp)
    })

    this.validateApps(builtApps)

    this.times.built = Date.now()
    this.helpers.log(`${this.times.built - this.times.start}ms`, {level: 'built apps in:'})

    this.builtApps = builtApps
    return this.builtApps
  }
}

AppsBuilder.helpers = makeHelpers.lib
AppsBuilder.flags = AppsBuilder.helpers.flags.searchAll
AppsBuilder.isWebpackCli = AppsBuilder.flags('bin/webpack', {type: 'bool'})
AppsBuilder.fuseCommander = fuseCommander

module.exports = AppsBuilder
