const test = require('ava')
const {fosho, log} = require('fosho')
const {Finder} = require('../src')

test('can use debug mode for logs', t => {
  t.plan(1)
  log.startCapturing()
  const found = Finder.file('./src/eh').debug().all().asObj().find()
  log.stopCapturing()
  fosho(log.savedLog.length, t).isAbove(0)
})
