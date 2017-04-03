const test = require('ava')
const fosho = require('fosho')
const {Finder} = require('../src')
const {src} = require('./fixtures/files')

test('finds with file only - without ext', t => {
  const found = Finder.file('eh').find()
  fosho(found).str().isAbs().exists().eq(src)
})

test('finds with file only - with ext', t => {
  const found = Finder.file('eh.js').find()
  fosho(found).str().isAbs().exists().eq(src)
})
