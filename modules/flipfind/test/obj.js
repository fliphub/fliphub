const test = require('ava')
const fosho = require('fosho')
const {Finder} = require('../src')

test('finds and returns full obj', t => {
  const found = Finder.file('./src/eh').all().asObj().find()
  fosho(found, t).obj()
  fosho(found.abs, t).str().isAbs()
})
