const test = require('ava')
const fliphash = require('../')

test('hashes a number', t => {
  t.plan(1)
  const txt = 'ehohehoh... wayoh wayoh wayoh-wayoh!'
  t.true(typeof fliphash(txt) === 'number')
})

test('hashes are the same', t => {
  t.plan(1)
  const txt = 'hullabaloo000&&&!!!eh'
  t.is(fliphash(txt), fliphash(txt))
})
