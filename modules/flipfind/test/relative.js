const test = require('ava')
const fosho = require('fosho')
const {Finder} = require('../src')
const {fixture} = require('./fixtures/files')

test('finds with relative path', t => {
  const found = Finder.file('./src/eh').all().find()
  fosho(found, t).str().isAbs().exists()
})

test('finds with dir', t => {
  const found = Finder.file('eh').dir('test/fixtures').find()
  fosho(found, t).str().isAbs().exists().eq(fixture)
})
