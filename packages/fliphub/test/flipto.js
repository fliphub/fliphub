const test = require('ava')
const {fosho, log} = require('fosho')
const {FlipHub, Workflow} = require('../src')

test('name is optional', (t) => {
  t.plan(1)
  const flips = new FlipHub({apps: [{}]})
  fosho(flips, t).aight()
})
test('flips are default to webpack', (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{name: 'default-to-webpack'}],
  })
  flips.setup()
  flips.workflow.mapContexts((context) => {
    fosho(context.bundler.api.constructor.name, t).preMuch('Neutrino')
  })
})

// works with no presets
// contexts inherit bundler
// contexts do not inherit bundler if no inheriting
// multiple contexts have _bundler
// context is chainable
// context has app name
// context has bundler
test('flipto fusebox', (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{
      name: 'fsbx',
      flips: {
        from: 'webpack',
        to: 'fusebox',
      },
    }],
  })
  flips.setup()
  flips.workflow.mapContexts((context) => {
    // log.verbose(10).data(context.bundler).echo()
    fosho(context.bundler.api.constructor.name, t).preMuch('FuseBoxBundler')
  })
})

test('flipto rollup', (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{
      name: 'webpack - neutrino',
      flips: {
        to: 'rollup',
      },
    }],
  })
  flips.setup()
  flips.workflow.mapContexts((context) => {
    // log.verbose(10).data(context.bundler).echo()
    fosho(context.bundler.api.constructor.name, t).preMuch('Rollup')
  })
})
