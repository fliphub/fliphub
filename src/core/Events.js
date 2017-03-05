const EventEmitter2 = require('eventemitter2').EventEmitter2
class FlipEvents extends EventEmitter2 {}
const evts = new FlipEvents({wildcard: true, maxListeners: 100})
const evtsForApps = {}
evts.evtsForApps = evtsForApps

// process.on('uncaughtException', (err) => {
//   console.error(err)
//   console.exit(err)
// })

// const debugs = []
// evts.on('debug.adds', (data) => {
//   // console.log(data)
//   debugs.push(data)
// })
// evts.on('debug.add', (msg, method, data, log) => {
//   debugs.push({msg, method, data, log, time: Date.now()})
// })
// evts.on('debug.add', (msg, method, data, log) => {
//   debugs.push({msg, method, data, log, time: Date.now()})
// })
// evts.on('debug.flush', () => {
//   // console.log(debugs)
// })
// evts.once('event', () => {
//   console.log('an event occurred!')
// })
evts.for = (name) => {
  class FlipAppEvents extends EventEmitter2 {
    constructor(args) {
      super(args)
      this.inspect = inspectorGadget(this, {whitelist: ['listenerTree']})
    }
  }
  evtsForApps[name] = new FlipAppEvents(({wildcard: true, maxListeners: 100}))
  return evtsForApps[name]
}

module.exports = evts
