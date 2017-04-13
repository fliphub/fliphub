const test = require('ava')
const {fosho, log} = require('fosho')
const flipcache = require('../src')

test.todo('needs .beforeAll')
test.todo('hashcash with no name works by using hashfiles')
test.todo('hashcash works versioned')
test.todo('hashcash clears old versions if versioned')
test.todo('hashcash stale expires correctly')
test.todo('hashcash stale reports correctly when not expired')
test.todo('hashcash hashChanged returns correctly')
test.todo('hashcash bustOnChange works')
test.todo('hashcash bust clears cache')
test.todo('hashcash onBusted cb is called')

// ensure the files exist
test.before(t => {
  const content = Math.random(0, 1000000000) + ''
  flipcache
    .hashCache()
    .hash('alwaysRandom')
    .setContent(content)

  flipcache
    .hashCache()
    .hash('always-the-same')
    .setContent('always the same')
})

test('hashcache with random content is always invalid', t => {
  const content = Math.random(0, 1000000000) + ''
  const config = flipcache
    .hashCache()
    .hash('alwaysRandom')
    .setContent(content)

  t.false(config.canBeUsed(content))
})
test('hashcache with the same content is always the same', t => {
  const config = flipcache
    .hashCache()
    .hash('always-the-same')
    .setContent('always the same')

  t.true(config.canBeUsed())
})
