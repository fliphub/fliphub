const test = require('ava')
const fosho = require('fosho')
const {Finder} = require('../src')

test('cannot find a file that does not exist', t => {
  t.plan(1)
  const found = Finder.file('not-real').find()
  fosho(found, t).isNull()
})
