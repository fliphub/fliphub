const AppContext = require('./AppContext')

// @TODO:
// - [ ] move instance vars on here
// - [ ] move app instance vars on here with keyed ^
// - [ ] integrate with the fusebox & webpack contexts
class AppsContext {
  constructor(apps, box) {
    this.box = box
    this.apps = apps
    this.contexts = {}

    this.box.evts.on('apps.build', () => this.build())
    // subscribe it to each of the events
    // then filter comes down
    // evt.registerApp(app)
  }

  build() {
    for (let i = 0; i < this.apps.length; i++) {
      var app = this.apps[i]
      this.box.helpers.log.text('👨‍🔧  ⌛  building: ' + app.name, 'yellow')
      this.contexts[app.name] = new AppContext(app, this.box)
    }
  }
}

module.exports = AppsContext
