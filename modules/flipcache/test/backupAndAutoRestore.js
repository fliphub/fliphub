const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

test('should be able to autoRestore', t => {
  const config = flipcache
    .from('./fixtures/fromBackupAndRestore.js')
      .end()
    .to('./fixtures/toBackupAndRestore.js')
      .end()
    .dir(__dirname)
    .backup()
    .autoRestore(500)

  config
    .from()
      .setContent('// this is no good')
      .write()

  const toContents = config.to().load(true).contents.trim()
  const fromContents = config.from().load(true).contents.trim()

  t.notDeepEqual(toContents, fromContents)

  return new Promise(resolve => setTimeout(() => {
    const toRestored = config.to().load(true).contents
    const fromRestored = config.from().load(true).contents
    t.deepEqual(toRestored, fromRestored)
    resolve()
  }, 1000))
})
