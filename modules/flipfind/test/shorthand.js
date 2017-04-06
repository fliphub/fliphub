const test = require('ava')
const fosho = require('fosho')
const {Finder, find} = require('../src')

test('finds and returns str with shorthand', t => {
  const found = Finder.file('src/eh').find()
  fosho(found, t).str().isAbs().exists()
})

test('finds and returns str by default', t => {
  const found = find('src/eh')
  fosho(found, t).str().isAbs().exists()
})
