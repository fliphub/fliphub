const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

test('should be able to autoRestore', async t => {
  const config = flipcache.reinit()
    .from('./fixtures/fromAutoRestore.js')
      .end()
    .to('./fixtures/toAutoRestore.js')
      .end()
    .dir(__dirname)
    .autoRestore(1000)
    .from()
      .setContent('// auto-restore-changed')
      .write()

  await new Promise(resolve => setTimeout(resolve, 1100))
  const toRestored = config.to().load(true).contents
  const fromRestored = config.from().load(true).contents
  t.deepEqual(toRestored, fromRestored)
})
