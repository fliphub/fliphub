const test = require('ava')
const sleepfor = require('sleepfor')
const {fosho} = require('fosho')
const flipcache = require('../src')

test('should be able to autoRemove', async t => {
  const config = flipcache
    .to('./fixtures/.config.json')
    .dir(__dirname)
    .json()
    .load()
    .update('eh', ['some values'])
    .write()
    .autoRemove(100)

  fosho(config.absPath).exists()
  await new Promise(resolve => setTimeout(resolve, 300))
  fosho(config.absPath).aintExists()
  t.pass()
})
