const AppContext = require('./AppContext')

// @TODO:
// - [ ] move instance vars on here
// - [ ] move app instance vars on here with keyed ^
// - [ ] integrate with the fusebox & webpack contexts
//
// - [ ] build the flags, then add listeners
class AppsContext {
  constructor(apps, box) {
    this.inspect = inspectorGadget(this, ['box', 'apps'])
    // this.inspector = inspectorGadget(this, (key, val) => {
    //   const filters = ['box', 'app']
    //   if (filters.includes(key)) return key
    //   if (key === 'contexts')
    // })

    this.currentApp = null
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

    // subscribe it to each of the events
    // then filter comes down
    // evt.registerApp(app)
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
    // console.exit(this.contextNames, this.box.filtered)
    // this.contextNames = this.contextNames
    //   .filter(app => this.box.filtered.includes(app.name))
    this.contextNames = this.box.filtered
    // console.exit(this.contextNames, this.box.filtered)
    // const filtered = this.box.filtered
    // this.contextNames = []
    // this.apps = [this.apps[0]]

    this.currentApp = 0
    this.setupApp(0)

    // @TODO:
    // if verbose setup,
    // if verbose app
    this.box.debugFor('whitespace',
      '\n========================================\n',
      {color: 'bold', text: true, time: false})

    return this.box
  }

  setupApp(i) {
    const name = this.contextNames[i]
    const app = this.appsByName[name]
    // console.exit(app, name, this.contextNames, i, this.appsByName)
    // for (let i = 0; i < this.apps.length; i++) {
    // if (!filtered.includes(app.name)) {
    //   log('☕  filtered out: ' + app.name, 'yellow.italic')
    //   continue
    // }
    console.color('👨‍🔧  ⌛  setting up: ' + app.name, 'yellow')

    this.contexts[name] = new AppContext(app, this.box)
    // this.contextNames.push(app.name)
    // this.addOps(app.name, this.contexts[app.name])
    // }
  }

  buildApp(i) {
    const name = this.contextNames[i]
    const context = this.contexts[name]
    this.currentApp = name

    console.xterm('🏭  building: ' + name, 'whiteBright')
    context.build()
  }

  // could subscribe
  // to the first app being built
  // to run the next one...
  build() {
    this.buildApp(0)

    for (let i = 1; this.contextNames.length > i; i++) {
      if (!this.apps[i]) {
        // console.log(this.contextNames[i])
        console.log(i)
        continue
      }
      this.setupApp(i)
      this.buildApp(i)
    }

    return this.box
    // this.contextNames = this.contextNames.reverse()
  }

  // buildApp() {
  // }

  // should be in extensible!!!!
  addOps(name, context) {
    this.box.evts.on('apps.compile.' + name, (args) => context.compile(args))
    this.box.evts.on('apps.run.' + name, (args) => context.run(args))
    this.box.evts.on('apps.exec.' + name, (args) => context.exec(args))
    this.box.evts.on('apps.release.' + name, (args) => context.release(args))
    this.box.evts.on('apps.clean.' + name, (args) => context.clean(args))
    this.box.evts.on('apps.test.' + name, (args) => context.test(args))
    this.box.evts.on('apps.dry.' + name, (args) => context.dry(args))
    this.box.evts.on('apps.watch.' + name, (args) => context.watch(args))

    // ?
    // this.box.evts.on('apps.mediator.' + name, (args) => context.mediator(args))
  }
}

module.exports = AppsContext
