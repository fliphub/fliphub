const {EventEmitter2} = require('eventemitter2')
const {inspectorGadget} = require('inspector-gadget')

// define
class FlipEvents extends EventEmitter2 {
  constructor(args) {
    super(args)
    this.inspect = inspectorGadget(this, {whitelist: ['listenerTree']})
  }
}
class FlipAppEvents extends FlipEvents {}

// instantiate
const evts = new FlipEvents({wildcard: true, maxListeners: 100})

// decorate
const evtsForApps = {}
evts.evtsForApps = evtsForApps
evts.for = (name) => {
  evtsForApps[name] = new FlipAppEvents(({wildcard: true, maxListeners: 100}))
  return evtsForApps[name]
}

module.exports = evts
