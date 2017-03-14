// for use when doing things like
// add middleware, add defaults, etc

class WorkSpaceContext {
  constructor() {
  }
  arithmetics() {

  }
  setFilters(filters) {
    this.evts.emit('filter.defaults', filters)
    return this
  }
  setDefaultAppNames(defaultAppNames) {
    this.evts.emit('filter.defaults', defaultAppNames)
    return this
  }
  // addDefaults(defaults) {
  //   this.evts.emit('presets.defaults', defaults)
  //   return this
  // }
  // addPreset(presets) {
  //   this.evts.emit('presets.add', presets)
  //   return this
  // }
  // addPresets(presets) {
  //   this.evts.emit('presets.add', presets)
  //   return this
  // }
  // extendPresets(presets) {
  //   this.evts.emit('presets.extend', presets)
  //   return this
  // }
  addMiddlewares(middleware) {
    this.evts.emit('middleware.add', middleware)
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
    this.evts.emit('filter', {apps, filters})
  }
}

module.exports = WorkSpaceContext
