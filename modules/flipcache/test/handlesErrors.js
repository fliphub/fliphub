const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

// if I process exit, ava cannot handle it... grr
test.skip('should be able to handle errors and process exits', t => {
  // make sure the caught error is asserted
  // make sure the file was changed on error
  // and that after the callback, the file is restored
  t.plan(3)

  const config = flipcache
    .from('./fixtures/fromErrorHandling.js')
      .end()
    .to('./fixtures/toErrorHandling.js')
      .end()
    .dir(__dirname)
    .autoRestore(600)
    .from()
      .setContent('should not be here when an error comes')
      .write()

  // could even process exit here
  // and spawn a subprocess to do the assertion?

  let resolve

  setTimeout(() => {
    const toRestored = config.to().load(true).contents
    const fromRestored = config.from().load(true).contents
    t.deepEqual(toRestored, fromRestored)
    t.pass()
    resolve()
  }, 1000)

  process.on('unhandledRejection', (error) => {
    console.log(error, 'ugh')
  })
  process.on('uncaughtException', (error) => {
    const to = config.to().load(true).contents
    const from = config.from().load(true).contents
    t.true(typeof error === 'object')
    t.notDeepEqual(to, from)
  })

  setTimeout(() => {
    throw new Error('something bad')
  }, 100)

  return new Promise(r => resolve = r)
})
