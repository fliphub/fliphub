const test = require('ava')
const flipcache = require('../src')

test('should be able to autoRestore', t => {
  const config = flipcache
    .from('./fixtures/from.js').end()
    .to('./fixtures/to.js').end()
    .dir(__dirname)
    .backup()

  t.deepEqual(config.to().contents, config.from().contents)
})
