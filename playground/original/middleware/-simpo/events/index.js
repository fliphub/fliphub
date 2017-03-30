const EventEmitter = require('events')

class FlipEvents extends EventEmitter {}

const flipe = new FlipEvents()
flipe.on('event', () => {
  console.log('an event occurred!')
})
flipe.once('event', () => {
  console.log('an event occurred!')
})

class FlipStandards {
  apps
  totalApps
  contexts
}

// events for each
class FlipOps {
  compile() {}
  run() {}
  test() {}
  exec() {}
}

class FlipApp {
}

class FlipApps {}

// standard
class FlipContext {
  constructor() {
    this.alias
    this.debug
    this.builder
    this.operations
    this.sourcemaps
    this.loaders
    this.plugins
    this.flags
  }
}

// filtering... mediator... fullAuto... validate...
// watch
// copy, clean -> scripts

// flipbox.middleware.add chainable to flipbox









// so what if it takes in webpack and outputs flip? or a mix?
// transformation only layer?

// transform X to flip standard
// then flipstandard to Y or even X
// not as performant, but makes most sense

// can handle defaults and merging in the same way?

flipe.emit('builder', 'webpack')
flipe.emit('loader', 'babel', {})
flipe.emit('alias')
flipe.emit('exclude')
flipe.emit('include')
flipe.emit('flag')
flipe.emit('html')



flipe.emit('core.compile', 'appname')
flipe.emit('core.build') // mediator?
flipe.emit('core.run')
flipe.emit('core.env')
flipe.emit('core.out')
