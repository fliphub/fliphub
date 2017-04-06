const test = require('ava')
const all = require('../all')

test('all exports everything', (t) => {
  t.true(Object.keys(all).length > 20)
  t.true(all.path !== undefined)
  t.true(all.glob !== undefined)
  t.true(all.exists !== undefined)
})
