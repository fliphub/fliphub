const test = require('ava')
const {fosho, log} = require('fosho')
const {FlipHub} = require('../src')

test.skip('flipto works with flags', (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{name: 'default-to-webpack'}],
  })
  flips.setup()
  flips.workflow.mapContexts((context) => {
    fosho(context.bundler.api.constructor.name, t).preMuch('Neutrino')
  })
})
