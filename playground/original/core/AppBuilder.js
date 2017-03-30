const _sortBy = require('lodash.sortby')

// for building 1 app
class AppBuilder {
  constructor(options) {
    var {
      middlewares,
      helpers,
      defaults,
      addPresets,
      extendPresets,
    } = options
    this.helpers = helpers
    this.middlewares = middlewares
    this.addDefaults(defaults)
    this.addPresets(addPresets)
    this.extendPresets(extendPresets)
  }

  // @TODO
  // add to specific apps (by using the keys of course)
  // append to middleware | merge with middleware
  addMiddleware(additionalMiddleware, options) {
    // if array, else
    this.middlewares = Object.assign(this.middlewares, additionalMiddleware)
  }
  addPresets(additionalPresets, options) {
    if (!additionalPresets) return
    var presets = this.middlewares['init'](additionalPresets, this.helpers)
    this.middlewares['presets'].addPresets(presets)
  }
  extendPresets(extendingPresets, options) {
    if (!extendingPresets) return
    var presets = this.middlewares['init'](extendingPresets, this.helpers)
    this.middlewares['presets'].extendPreset(presets)
  }
  addDefaults(defaults) {
    this.helpers.defaults = defaults
  }

  // @param App, String
  pipe(app, name) {
    if (app.debug.pipe) {
      // @TODO: repeat
      console.log('\n\n\n\n\n\n\n\n\n\n')
      var msg = {color: 'blue', level: `| piping for ${name}`}
      if (app.debug.verbose)
        this.helpers.log.verbose(app, msg)
      else
        this.helpers.log(app, msg)
      this.helpers.log.text(name)
      console.log('\n\n\n\n\n\n\n\n\n\n')
    }

    var middleware = this.middlewares[name]
    if (app.debug.middleware)
      this.helpers.log(`| pipe | ${name}`, {color: 'blue', text: true})

    if (!middleware) {
      if (app.debug.missingMiddleware) {
        this.helpers.log.text(`🔍 🔌  did not have middleware: ${name}`, {
          color: 'yellow',
        })
      }

      return app
    }

    // @TODO: and if it does not have it
    if (typeof middleware === 'function')
      return middleware(app, this.helpers)

    if (typeof middleware.inject === 'function')
      return middleware.inject(app, this.helpers)
    else {
      this.helpers.log.error(middleware)
      // @TODO: validationError
      throw new Error('middleware was not a function and did not have .inject')
    }
  }

  decorate(app) {
    app = this.middlewares['init'](app, this.helpers)
    if (app.presets) app = this.middlewares['presets'](app, this.helpers)

    if (app.config) {
      app = this.middlewares['config'](app, this.helpers)
    }
    else {
      app = this.middlewares['params'](app, this.helpers)
    }

    app._config = app.config

    // @NOTE WAS HERE
    // if (app.presets) app = this.middlewares['presets'](app, this.helpers)
    app = this.middlewares['defaults'](app, this.helpers)

    // @TODO: unless needed until filter
    delete app.defaults
    delete app.params
    delete app.config
    return app
  }

  // keep calling until middleware chain is done for each app?
  // one class for app one for apps?
  build(app) {
    app = this.decorate(app)
    var appKeys = Object.keys(app)
    var middlewareKeys = Object.keys(this.middlewares)

    // order by priority keys
    var orderFirst = [
      'noEmitErrors',

      'builder',

      'flags',

      // 'params',
      // 'config',
      // 'defaults',
      'presets',
      'env',

      // @NOTE: flags was here
      // 'flags',

      'loaders',

      'polyfill',
      // 'happypack',
      // '_noop',
    ]

    var orderLast = [
      'fusebox', 'configOut',
    ]

    // insert added middleware at x position
    middlewareKeys.forEach(name => {
      var index = this.middlewares[name].index
      if (index) {
        orderFirst.splice(index, 0, name)
      }
    })

    // so we can put `out` at the end
    var filter = orderFirst.concat(orderLast)
    var unorderedAppKeys = appKeys.filter(key => !filter.includes(key))
    orderFirst = orderFirst.concat(unorderedAppKeys).concat(orderLast)


    orderFirst = orderFirst.reverse()
    var ordered = _sortBy(appKeys, key => orderFirst.indexOf(key)).reverse()

    if (app.debug.order) this.helpers.log(ordered, {level: '🔢  ordered: '})

    // @TODO:
    // - [ ] optimize
    // - [ ] add logs for it
    var orderedAndAdded = ordered.slice(0)
    ordered.forEach(prop => {
      app = this.pipe(app, prop)
      var anyNewKeys = Object.keys(app)
      anyNewKeys.forEach(key => {
        if (!orderedAndAdded.includes(key)) {
          orderedAndAdded.push(key)
          app = this.pipe(app, key)
        }
      })
    })

    if (app.debug.order) {
      this.helpers.log(orderedAndAdded, {
        color: 'blue',
        level: '🔢  🗝️  decorated order',
      })
    }
    if (app.debug.decorated) {
      this.helpers.log.verbose(app, {color: 'blue', level: '🍬  decorated'})
      if (app.debug.verbose) this.helpers.log.verbose(app)
    }

    app.helpers = this.helpers

    return app
  }
}

module.exports = AppBuilder
