const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

test('should be able to autoRestore', t => {
  const config = flipcache
    .from('./fixtures/fromAutoRestore.js')
      .end()
    .to('./fixtures/toAutoRestore.js')
      .end()
    .dir(__dirname)
    .autoRestore(1000)
    .from()
      .setContent('// auto-restore-changed')
      .write()

  return new Promise(resolve => setTimeout(() => {
    const toRestored = config.to().load(true).contents
    const fromRestored = config.from().load(true).contents
    t.deepEqual(toRestored, fromRestored)
    resolve()
  }, 1000))
})
