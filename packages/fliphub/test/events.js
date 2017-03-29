const test = require('ava')
const {fosho, log} = require('fosho')
const fixture = require('./fixtures/simplestConfig')

/**
 * @event core.config
 *
 * @TODO: pre and post instead?
 * @event contexts.create.start
 * @event contexts.configs.start
 *
 * @event context.*.create
 * @event context.*.config.pre
 * @event context.*.config
 * @event context.*.config.post
 *
 * @TODO: this should be for `.core`?
 * @event context.*.merge.pre
 * @event context.*.merge.post
 *
 * @event context.*.init
 * @event context.*.init.post
 *
 *
 * @event contexts.configs.done
 * @event contexts.create.done
 */
test('events:', (t) => {
  const flips = fixture().create()
  t.plan(7)
  let called = 0
  const cb = (name) => (args) => {
    // log.reset().color('bold').text('cb ' + name).echo()
    fosho(args, t).isReal()
    called++
  }

  flips.evt.core().on('config', cb('core.config'))
  flips.evt.context().on('create', cb('create'))
  flips.evt.context().on('config.pre', cb('config.pre'))
  flips.evt.context().on('config', cb('config'))
  flips.evt.context().on('config.post', cb('config.post'))
  flips.evt.context().on('init.pre', cb('init.pre'))
  flips.evt.context().on('init', cb('init'))
  flips.evt.context().on('init.post', cb('init.post'))

  // @TODO: these are called before setup...
  flips.evt.context().on('contexts.create.start', cb('contexts.create.start'))
  flips.evt.context().on('contexts.configs.start', cb('contexts.configs.start'))
  flips.evt.context().on('contexts.create.done', cb('contexts.create.done'))
  flips.evt.context().on('contexts.configs.done', cb('contexts.configs.done'))

  flips.setup()
})
