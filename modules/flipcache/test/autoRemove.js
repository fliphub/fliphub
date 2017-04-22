const test = require('ava')
const sleepfor = require('sleepfor')
const {fosho} = require('fosho')
const {exists} = require('flipfile')
const flipcache = require('../src')

test('should be able to autoRemove', async t => {
  const config = flipcache
    .to('./fixtures/.config.json')
    .dir(__dirname)
    .json()
    .load()
    .update('eh', ['some values'])
    .write()
    .autoRemove(500)

  // might affect travis?
  await new Promise(resolve => setTimeout(resolve, 100))

  t.true(exists(config.absPath))
  await new Promise(resolve => setTimeout(resolve, 1000))
  fosho(config.absPath).aintExists()
  t.pass()
})
