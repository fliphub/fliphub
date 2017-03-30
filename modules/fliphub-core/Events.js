const {EventEmitter2} = require('eventemitter2')
const {inspectorGadget} = require('inspector-gadget')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const is = require('izz')
const log = require('fliplog')

class Emitter extends EventEmitter2 {
  // constructor(args) {
  //   super(args)
  //   // this.inspect = inspectorGadget(this, {whitelist: ['listenerTree']})
  // }
}

/**
 * @example
 * ````
 * this.workflow.evt.name('name-of-event-scoped-to->').core().emit(data)
 * this.workflow.evt.name('name-of-event-scoped-to->').context('name').emit(data)
 * this.workflow.evt.core().name('eh').cb(this.cb)
 * ````
 */
class EventChain extends ChainedMapExtendable {

  /**
   * @param {Workflow} parent
   * add shorthand methods to allow chaining
   */
  constructor(parent) {
    super(parent)

    this.extend([
      'name',
      // 'once',
      // 'on',
      'hub',
    ])
    this.extendTrue([
      'contexts',
      'context',
      'core',
    ])

    // @see this.once, this.on
    this._once = false
    this._on = false

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
    this._once = name
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
      .context(false)
      .contexts(false)
      .core(false)
      .hub(false)
  }

  /**
   * take our chained settings
   * make it into a namespaced string event
   *
   *
   * @see this.workflow, this.context, this.core, this.name
   * @return {string | Object}
   */
  getName() {
    const workflow = this.parent
    let {contexts, context, core, name} = this.entries()

    if (core) {
      name = 'core.' + name
    }
    else if (contexts) {
      name = 'context.*.' + name
    }
    else if (context) {
      // if (!workflow.current) return {name}
      let current = '*'
      if (workflow.current) current = workflow.current.name
      // let current = workflow.current.name
      name = 'context.' + current + '.' + name
    }

    return name
  }

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
   * @see this.getName, this.cb
   * @param {Object} args
   * @return {EventChain}
   *
   * when subscribing is done before a current context is set
   * then set the subscribing when it is set
   */
  enq({name, hub, once, cb}) {
    const str = name.name

    return this
      .name('current.set')
      .once(true)
      .cb(() => {
        return this
          .name(str)
          .hub(hub)
          .once(once)
          .cb(cb)
      })
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
    const {hub} = this.entries()
    const name = this.getName()
    const once = this._once

    // if (is.plainObj(name)) {
    //   this.enq({name, hub, once, cb})
    //   return this.reset()
    //   // return this.logSub(name)
    // }

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

class EventHub {

  /**
   * @param {Workflow} parent
   *
   * create the Emitter
   * decorate the parent with shorthand methods
   *
   */
  constructor(parent) {
    this.workflow = parent

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

// export
module.exports = EventHub
