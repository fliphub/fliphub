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
    .autoRemove(10)

  fosho(config.absPath).exists()
  await sleepfor(1000)
  fosho(config.absPath).aintExists()
  t.pass()
})
