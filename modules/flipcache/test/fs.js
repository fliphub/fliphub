const test = require('ava')
const flipcache = require('../src')

test('should be able to chain read load update write', t => {
  const config = flipcache
    .to('.config.js')
    .json()
    .load()
    .update('eh', ['some values'])
    .write()

  t.pass()
})
