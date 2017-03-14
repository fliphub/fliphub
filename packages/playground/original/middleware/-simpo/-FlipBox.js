var AppBuilder = require('./AppBuilder')
var makeHelpers = require('../lib')

// for building [appS]
class AppsBuilder {
  constructor(config) {
    this.times = {start: Date.now()}

    // @TODO: add better message
    if (!config) throw new Error('must pass in a config')
    var {
      aliasDir,
      root,
      debug,
    } = config
    this.debug = debug || false

    // @TODO: do better
    if (config.app && !config.apps)
      this.setApps([config.app])
    else if (config.apps)
      this.setApps(config.apps)
    else if (config.entry)
      this.setApps([config])
    else
      console.log('!!! not valid apps')

    this.setFilters(config.filters)
    this.setDefaultAppNames(config.defaultAppNames)

    this.helpers = makeHelpers({root, aliasDir})
    this.helpers.builder = this
    this.setAppBuilder(config.appBuilder)

    if (config.presets) this.addPresets(config.presets)
    if (config.middleware) this.addMiddlewares(config.middleware)
  }

  mediator() {
  }

  // the apps have already been filtered before building
  // so now we filter them down more based on what to do next
  fullAuto(options) {
    if (!options) options = {}
    if (!this.builtApps) this.build()

    if (AppsBuilder.isWebpackCli) {
      this.helpers.log.text('🕸  🛅  🖥  was webpack cli: fullAuto()')
      if (!options.force) return this.mediator()
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
      if (!options.force) return this.mediator()
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
      if (!options.force) return this.mediator()
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
    this.contexts.emitter.emit('ops.exec')
    return this
  }

  setFilters(filters) {
    this.contexts.emitter.emit('filter.defaults', filters)
    return this
  }
  setDefaultAppNames(defaultAppNames) {
    this.contexts.emitter.emit('filter.defaults', defaultAppNames)
    return this
  }
  addDefaults(defaults) {
    this.contexts.emitter.emit('presets.defaults')
    return this
  }
  addPresets(presets) {
    this.contexts.emitter.emit('presets.add')
    return this
  }
  extendPresets(presets) {
    this.contexts.emitter.emit('presets.extend')
    return this
  }
  addMiddlewares(middleware) {
    this.contexts.emitter.emit('m')
    return this
  }
  setApps(apps) {
    this.apps = apps.map((app, index) => {
      if (!app.name) app.name = index
      return app
    })
    return this
  }

  filter(apps, filters) {
    this.contexts.emitter.emit('filter', {apps, filters})
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
      if (builtApp.debug.built)
        this.helpers.log(app.webpack, {color: 'yellow', level: '🏗  built: ' + app.name})

      builtApps.push(builtApp)
    })

    this.validateApps(builtApps)

    this.times.built = Date.now()
    this.helpers.log(`${this.times.built - this.times.start}ms`, {level: 'built apps in:'})

    this.builtApps = builtApps
    return this.builtApps
  }
}

AppsBuilder.init = config => new AppsBuilder(config)

AppsBuilder.helpers = makeHelpers.lib
AppsBuilder.flags = AppsBuilder.helpers.flags.searchAll
AppsBuilder.isWebpackCli = AppsBuilder.flags('bin/webpack', {type: 'bool'})

module.exports = AppsBuilder
