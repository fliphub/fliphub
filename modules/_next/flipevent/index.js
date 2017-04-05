const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const is = require('is')
const log = require('log')

/**
 * @TODO: pass in names of things to chain
 *
 * @example
 * ```
 * this.workflow.evt.name('name-of-event-scoped-to->').core().emit(data)
 * this.workflow.evt.name('name-of-event-scoped-to->').context('name').emit(data)
 * this.workflow.evt.core().name('eh').cb(this.cb)
 * ```
 */
module.exports = class EventChain extends ChainedMapExtendable {

  /**
   * @see this.cb
   * @param {string} [name]
   * @param {boolean} [once]
   * @return {EventChain}
   */
  logSub(name, once) {
    log
      .tags('events,cb,subscribe')
      .text('subscribe: ')
      .data(name + (once ? ' once' : ' everytime'))
      .time(true)
      .color('yellow')
      .echo()
    return this
  }

  /**
   * @param {any} parent
   * add shorthand methods to allow chaining
   */
  constructor(parent) {
    super(parent)

    this.extend([
      'name',
    ])

    this.reset()
  }

  /**
   * if they pass a string into `on` or `once`
   * instead of `name`, use that instead
   *
   * @see this.once
   * @param {string} [name]
   * @param {Function} [cb]
   * @return {EventChain}
   */
  on(name = true, cb = null) {
    this._on = name
    if (typeof name === 'string') this.name(name)
    if (cb) this.cb(cb)

    return this
  }

  /**
   * if they pass a string into `on` or `once`
   * instead of `name`, use that instead
   *
   * @see this.on
   * @param {string} [name]
   * @param {Function} [cb]
   * @return {EventChain}
   */
  once(name = true, cb = null) {
    this.set('once', name)
    if (typeof name === 'string') this.name(name)
    if (cb) this.cb(cb)

    return this
  }

  /**
   * @return {EventChain}
   */
  reset() {
    return this
      .name(false)
      .once(false)
      .on(false)
  }

  /**
   * @see this.getName
   * @param {mixed} [data]
   * @return {EventChain}
   */
  emit(data) {
    const name = this.getName()
    this.parent.emit(name, data)
    return this.reset()
  }

  /**
   * final piece in a chain
   * @see this.getName
   * @param {Function} cb
   * @return {EventChain}
   */
  cb(cb) {
    if (is.bindable(cb)) cb = cb.bind(this.parent)
    const {hub, once} = this.entries()
    const name = this.getName()

    if (once) {
      this.parent.once(name, (args) => {
        log
          .emoji('phone')
          .tags('event,once,hub')
          .text('calling.once ' + name + ': ' + hub)
          .echo()
        cb(args)
      })
    }
    else {
      this.parent.on(name, (args) => {
        log
          .emoji('phone')
          .tags('event,on,hub')
          .text('calling.on ' + name + ': ' + hub)
          .echo()
        cb(args)
      })
    }

    return this
      .logSub(name, once)
      .reset()
  }
}
