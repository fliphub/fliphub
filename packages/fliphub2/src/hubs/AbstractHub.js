const {inspectorGadget} = require('inspector-gadget')

class AbstractHub {
  constructor(box) {
    this.box = box
    this.helpers = box.helpers
    this.inspect = inspectorGadget(this, ['box', 'app', 'context', 'args'])

    if (this.boxInit) this.boxInit({box, helpers: this.helpers})
  }
  setupAppInit({context, app, helpers, box}) {
    if (this.defaults) context.evts.once('appDefaults', args => this.defaults(args))
    if (this.appInit) context.evts.once('appInit', args => this.appInit(args))
    if (this.decorate) context.evts.once('appBuild', args => this.decorate(args))
  }
}

class SubHub {
  constructor({context, app, helpers, box}) {
    this.box = box
    this.helpers = helpers
    this.inspect = inspectorGadget(this, ['box', 'app', 'context', 'args'])
    if (this.init) this.init({context, app, helpers, box})
  }
}

AbstractHub.SubHub = SubHub


module.exports = AbstractHub
