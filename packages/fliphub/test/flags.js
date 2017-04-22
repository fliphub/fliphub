const test = require('ava')
const {fosho, log} = require('fosho')

test.failing('filtering apps will only build specified app', (t) => {
  const {FlipHub} = require('../src')

  t.plan(1)
  const flips = new FlipHub({
    apps: [{name: 'thing1', name: 'thing2', name: 'thing3'}],
  })

  process.env.push('--apps=thing1')
  flips.setup()

  log.quick(flips)
})

test.skip('flipto works with flags', (t) => {
  const {FlipHub} = require('../src')

  t.plan(1)
  const flips = new FlipHub({
    apps: [{name: 'default-to-webpack'}],
  })
  flips.setup()
  flips.workflow.mapContexts((context) => {
    fosho(context.bundler.api.constructor.name, t).preMuch('Neutrino')
  })
})
