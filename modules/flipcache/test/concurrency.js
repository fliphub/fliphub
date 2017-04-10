const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

function callRestore(index) {
  return flipcache
    .from('./fixtures/fromConcurrency.js')
      .load(true)
      .setContent('// from concurrency original ' + index)
      .write()
      .end()
    .to('./fixtures/toConcurrency.js')
      .end()
    .dir(__dirname)
    .backup(5000)
    .autoRestore(500)
}

test.only('will not enqueue more restores if one is already in progress', t => {
  const config = callRestore('0')
  callRestore(1)
  callRestore(2)
  callRestore(3)
  callRestore(4)

  return new Promise(resolve => setTimeout(() => {
    const toRestored = config.to().load(true).contents
    const fromRestored = config.from().load(true).contents
    t.deepEqual(toRestored, fromRestored)
    t.deepEqual(toRestored, '// from concurrency original 0')
    resolve()
  }, 1000))
})
