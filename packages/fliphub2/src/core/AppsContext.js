const AppContext = require('./AppContext')
const {inspectorGadget} = require('inspector-gadget')

class AppsContext {
  constructor(apps, box) {
    this.inspect = inspectorGadget(this, ['box', 'apps'])
    this.box = box
    this.apps = apps

    this.contexts = {}
    this.contextNames = []
    this.appsByName = {}

    for (let i = 0; i < apps.length; i++) {
      const app = apps[i]
      const name = app.name || i
      this.contextNames.push(app.name)
      this.appsByName[name] = app
    }
  }

  // @TODO: decorate flipbox
  setApps(apps) {
    this.apps = apps.map((app, index) => {
      if (!app.name) app.name = index
      return app
    })
    return this
  }

  setup() {
    this.contextNames = this.box.filtered
    this.setupApp(0)
    this.box.debugFor('whitespace')
      .text('\n========================================\n')
      .color('bold').time(false).echo()

    return this.box
  }

  setupApp(i) {
    const name = this.contextNames[i]
    const app = this.appsByName[name]
    this.box
      .debugFor('setup').xterm('yellow')
      .text('👨‍🔧  ⌛  setting up: ' + app.name).echo()
    this.contexts[name] = new AppContext(app, this.box)
  }

  buildApp(i) {
    const name = this.contextNames[i]
    const context = this.contexts[name]
    this.box
      .debugFor('building').xterm('whiteBright')
      .text('🏭  building: ' + name).echo()
    context.setup()
  }

  build() {
    this.buildApp(0)

    for (let i = 1; this.contextNames.length > i; i++) {
      if (!this.apps[i]) continue
      this.setupApp(i)
      this.buildApp(i)
    }

    return this.contexts
  }
}

module.exports = AppsContext
