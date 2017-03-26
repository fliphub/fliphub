const test = require('ava')
const {fosho, log} = require('fosho')
const exported = require('../src')

test('exports correctly', (t) => {
  t.plan(1)
  const {
    FlipHub,
    resolve,
    Core,
    Context,
    Workflow,
    Hub,
    Presets,
    ChainedMap,
  } = exported
  fosho(exported, t).hasProps('FlipHub,resolve,Core,Context,Workflow,Hub,Presets,ChainedMap')
})
