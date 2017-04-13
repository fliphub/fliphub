const test = require('ava')
const {fosho, log} = require('fosho')
let flipcache = require('../src')

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
    .backup(20000)
    .autoRestore(500)
    .debug(true)
}

test(`will not enqueue more restores
  if one is already in progress`, async t => {
  await new Promise(resolve => setTimeout(resolve, 10000))
  // flipcache = flipcache.reinit()
  const config = callRestore('0')
  callRestore('1')
  callRestore('2')
  callRestore('3')
  callRestore('4')

  await new Promise(resolve => setTimeout(resolve, 20000))
  const toRestored = config.to().load(true).contents
  const fromRestored = config.from().load(true).contents
  t.deepEqual(toRestored, fromRestored)
  t.deepEqual(toRestored, '// from concurrency original 0')
})
