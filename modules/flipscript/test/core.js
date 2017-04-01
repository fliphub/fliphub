const test = require('ava')
const fosho = require('fosho')
const {ScriptFlip} = require('../src')

test.todo('stringify')

test('can use toString', (t) => {
  const scripts = new ScriptFlip()
    .add()
    .npm('diggy')
    .env('magic')
    .flag('env.zoolala', 'aoao')
    .arg('-e')
  fosho(scripts.toString(), t).str()
})
test('can use toCmd on all scripts for an array', (t) => {
  const scripts = new ScriptFlip()
  scripts
    .add()
    .npm('diggy')
    .env('magic')
    .flag('env.zoolala', 'aoao')
    .arg('-e')
  fosho(scripts.toCmd(), t).arr()
})
test('can use toCmd on one script for an obj', (t) => {
  const scripts = new ScriptFlip()
    .add()
    .npm('diggy')
    .env('magic')
    .flag('env.zoolala', 'aoao')
    .arg('-e')
  fosho(scripts.toCmd(), t).all(['obj'])
})
