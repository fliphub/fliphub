const test = require('ava')
const src = require('../src')

test.todo('two plus two?')

test('src is easy button', t => {
  t.is(src, 'easy button')
})
