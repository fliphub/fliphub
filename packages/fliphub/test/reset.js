const test = require('ava')
const {fosho, log} = require('fosho')
const fixture = require('./fixtures/simplestConfig')

/**
 * @see fliphub-core/Workflow.reset
 */
test('operation reset', (t) => {
  t.plan(2)
  const reset = fixture().setup().reset
  fosho(reset, t).fn()
  fosho(reset(), t).aintReal()
})
