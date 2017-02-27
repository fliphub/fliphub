const Apps = require('./AppsContext')
const makeHelpers = require('../../lib')

const EventEmitter = require('events')
class FlipEvents extends EventEmitter {}
const evts = new FlipEvents()
evts.once('event', () => {
  console.log('an event occurred!')
})

class FlipBox {
  constructor(config) {
    this.times = {start: Date.now()}
    this.helpers = makeHelpers(config)
    this.evts = evts
    this.apps = new Apps(config.apps, this)
    evts.emit('event')

    this.build = () => evts.emit('apps.build')
  }
}

FlipBox.init = config => new FlipBox(config)
module.exports = FlipBox
