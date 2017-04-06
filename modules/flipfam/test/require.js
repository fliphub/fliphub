const test = require('ava')
const index = require('../')
const pkg = require('../package.json')

test('exports has same keys as pkg json', t => {
  const deps = Object.keys(pkg.dependencies)
  const keys = Object.keys(index)

  t.is(deps.length, keys.length)
})
