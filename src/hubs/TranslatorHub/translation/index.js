const translators = {
  finisher: require('./finisher'),
  alias: require('./alias'),
  bundles: require('./bundles'),
  builder: require('./builder'),
  flatten: require('./flatten'),
  loaders: require('./loaders'),
}

const evts = [
  'flatten',
  'builder', 'bundles', 'loaders',
  'alias', 'finisher',
]

// @TODO: handle just functions without test?
class Translator {
  constructor({app, box, context}) {
    this.inspect = inspectorGadget(this)
    this.app = app
    this.box = box
    this.context = context

    const translator = this
    const helpers = box.helpers
    this.args = {app, box, context, helpers, translator}
    this.context.emit('translator.instantiate', this.args)

    for (let i = 0; evts.length > i; i++) {
      const evt = evts[i]
      this.register('translate.' + evt, translators[evt])
    }
  }
  translate() {
    // emit built in key handlers in order
    for (let i = 0; evts.length > i; i++) {
      const evt = evts[i]
      this.context.emit('translate.' + evt, this.args)
    }

    // emit all the leftover keys
    const {args, app} = this
    for (let i = 0; app._keys.length > i; i++) {
      // because they've already been translated
      if (evts.includes(app.key)) continue

      // to pass it along in the payload
      args.key = app._keys[i]

      this.context.emit('translate.' + args.key, args)
    }
    delete args.key

    this.context.emit('translator.done', this.args)
    return this
  }

  translateFor(translator) {
    // badLog(translator)
    if (typeof translator.test === 'function' && !translator.test(this.app)) {
      this.context.debugFor(
        ['translate', 'missing'],
        'did not translate',
        'cyan',
        translator)
      return
    }

    // test passed or there is no test
    // if (translator.init) translator.init(this.context)
    if (translator.translate) {
      translator.translate({
        app: this.app,
        helpers: this.box.helpers,
        context: this.context,
      })
    }
    if (typeof translator === 'function') {
      translator({
        app: this.app,
        helpers: this.box.helpers,
        context: this.context,
      })
    }
    return this
  }

  register(evt, translator) {
    this.context.evts.once(evt, (app) => this.translateFor(translator))

    // to subscribe to events
    if (translator.init && !translator.initted) {
      translator.init({
        app: this.app,
        helpers: this.box.helpers,
        context: this.context,
        emit: this.context.emit,
      })
      translator.initted = true
    }
    return this
  }
}

module.exports = Translator
