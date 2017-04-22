const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

test('should be able to autoRestore', async t => {
  const config = flipcache.reinit()
    .from('./fixtures/fromBackupAndRestore.js')
      .setContent('// this is good')
      .write()
      .end()
    .to('./fixtures/toBackupAndRestore.js')
      .end()
    .dir(__dirname)
    .backup(0)
    .autoRestore(500)

  config
    .from()
      .setContent('// this is no good')
      .write()

  const toContents = config.to().load(true).contents.trim()
  const fromContents = config.from().load(true).contents.trim()

  t.notDeepEqual(toContents, fromContents)

  await new Promise(resolve => setTimeout(resolve, 2000))

  const toRestored = config.to().load(true).contents
  const fromRestored = config.from().load(true).contents
  t.deepEqual(toRestored, fromRestored)
})
