const log = require('fliplog')
const EventChain = require('./events')
const Emitter = require('eventemitter2')

module.export = class EventHub {

  /**
   * @param {Workflow} parent
   *
   * create the Emitter
   * decorate the parent with shorthand methods
   *
   */
  constructor(parent) {
    // instantiate
    this.emitter = new Emitter({wildcard: true, maxListeners: 100})

    // subscribe to all events, log if enabled
    this.emitter.onAny((name, data) =>
      log
        .tags('events,any')
        .text('onAny: ')
        .data(name)
        .time(true)
        // .data(data)
        .color('yellow')
        .silent()
        .echo())

    // decorate parent
    parent.emit = this.emit.bind(this)
    parent.on = this.on.bind(this)
    parent.once = this.once.bind(this)
    parent.evts = this.emitter

    this.chain = new EventChain(parent)
    parent.evt = this.chain
  }

  /**
   * clears all listeners
   * @return {EventHub}
   */
  reset() {
    this.emitter.removeAllListeners()
    this.chain.reset()
    return this
  }

  /**
   * @param {string} [name]
   * @param {mixed} [data]
   * @return {EventHub}
   */
  emit(name, data) {
    log
      .tags('events,any,emit')
      .text('emit: ')
      .data(name)
      .time(true)
      .color('yellow')
      .echo()

    this.emitter.emit(name, data)
    return this
  }

  /**
   * @param {string} name
   * @param {function} cb
   * @return {EventHub}
   */
  on(name, cb) {
    this.emitter.on(name, cb)
    return this
  }

  /**
   * @param {string} name
   * @param {function} cb
   * @return {EventHub}
   */
  once(name, cb) {
    this.emitter.once(name, cb)
    return this
  }
}
