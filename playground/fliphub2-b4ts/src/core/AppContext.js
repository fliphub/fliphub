class AppContext {
  constructor(app, box) {
    this.inspect = inspectorGadget(this, ['box', 'app', 'translator', 'hub'])
    this.debugFor = box.helpers.debugFor({app: {debug: {all: true}}})

    // is the real app context...
    this.polyfills = {}
    this.settings = {}
    this.name = app.name
    if (Array.isArray(this.name)) this.name = this.name.join(',')

    this.box = box
    this.app = app
    this.setupEvents()

    this.hubs = box.hubs
    this.hubs.appInit({
      context: this,
      app: this.app,
      helpers: this.box.helpers,
      box: this.box,
    })
  }

  // maybe should just use the flipbox one
  // and namespace the events
  //
  // however, this allows easier per context events
  // and it allows going context to box
  // for all generalized ops so clients can subscribe their own
  // such as translators on keys
  setupEvents() {
    this.evts = this.box.evts.for(this.name)
    this.emit = (a1, a2, a3, a4, a5) => {
      this.evts.emit(a1, a2, a3, a4, a5)
      this.box.evts.emit(a1, a2, a3, a4, a5)
    }
    this.on = (name, handler) => {
      this.evts.on(name, handler)
      this.box.evts.on(`${name}.${this.name}`, handler)
    }
    this.once = (name, handler) => {
      this.evts.once(name, handler)
      this.box.evts.once(`${name}.${this.name}`, handler)
    }
    this.evts.onAny((event, value) => {
      if (event == 'removeListener') {
        // console.log(arguments)
        // console._text.color.xterm('✕ ' + event + ' ' + value, 'orange')
        return
      }
      console._text.color.xterm('📢  ' + event + ' ' + this.app.name, 'orange')
    })
  }

  build() {
    this.hubs.appBuild({
      context: this,
      app: this.app,
      helpers: this.box.helpers,
      box: this.box,
    })
  }
}

module.exports = AppContext
