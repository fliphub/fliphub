const AbstractHub = require('../AbstractHub')
const builtIn = require('./built-in')

class DefaultHub extends AbstractHub {
  addDefault(defaults) {
    this.boxDefaults = Object.assign(this.boxDefaults, defaults)
    // flip.debugFor?
    // context.debugFor('addPresets', '🍰  adding defaults', 224, defaults)
    // this.boxDefaults = defaults
    return this.box
  }

  // -----

  boxInit({box}) {
    this.boxDefaults = builtIn()
    box.addDefaults = (defaults) => this.addDefault(defaults)
    box.addDefault = (defaults) => this.addDefault(defaults)
  }

  appInit({app, context, helpers}) {
    // this.appDefaults = builtIn()
    // subscribe
  }

  // -----

  defaults({app, context, helpers}) {
    if (app.env) {
      // this.boxDefaults.env = Object.assign(this.boxDefaults.env, app.env)
    }
    if (app.cache) {
      context.settings.cache = app.cache
    } else {
      context.settings.cache = false
    }

    context = Object.assign(context, this.boxDefaults)

    // if (helpers.defaults) {
    //   defaults = Object.assign(defaults, helpers.defaults)
    // }

    // var _merge = require('lodash.merge')
    // var merged = _merge(defaults, app)

    // can use .builder property
    // which contains an object to be merged
    // to the main config for that app
    // if (app.builder) {
    //   merged = Object.assign(merged, app.builder)
    //   delete merged.builder
    // }

    // // @TODO: improve
    // if (app._config || app.config) {
    //   // merged.loaders = []
    //   // delete defaults.loaders
    //   // delete defaults.happypack
    //   // defaults.happypack = false
    // }

    // if there is aliases and fusebox without fuseboxAliases
    // then use babelAlias
    //
    // @TODO: and loaders includes babel
    // if (merged.fusebox && !merged.fuseboxAlias && app.alias && app.loaders) {
    //   app.babelAlias = true
    //   // app.babelWebpackAlias = true
    // }

    // if (merged.debug.defaults) {
    //   helpers.log(merged, '🍦  defaults:')
    // }
  }
  // decorate() {}
}

module.exports = DefaultHub
