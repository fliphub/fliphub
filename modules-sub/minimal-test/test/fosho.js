const test = require('ava')

// this is chai.expect, and chai.should, fliplog, and fliplog
const {fosho, log, expect, should} = require('fosho')

class Workflow {}

// https://www.youtube.com/watch?v=d_XVVCVHGlQ&feature=youtu.be&t=9s
test('fosho', (t) => {
  fosho('eh', t)
    .isReal()
    .isStr()
    .str()
    .aintFunction()

  fosho('nice boulder', t)
    .str()
    .findString('nice')
    .findString('boulder')

  fosho(['one'], t)
    .lengthOf(1)
    .typeOf('array')

  fosho(1, t)
    .isAbove(0)
    .isBelow(2)
    .above(-1)
      .below(2)
  t.pass()
})

test.failing('fosho not a nice boulder...', (t) => {
  fosho({niceBoulder: true})
    .isReal()
    .obj()
    .instanceOf(Workflow)
})

test('plan fosho', (t) => {
  t.plan(2)
  fosho({niceBoulder: true}, t)
    .isReal()
    .obj()
})

test('fns', (t) => {
  const fnb = () => {}
  function func() {}

  fosho(fnb, t)
    .fn()
    .aintBindable()
  fosho(func, t)
    .isFunction()
    .bindable()
    .all(['function', 'bindable'])

  fosho(fnb, t)
    .fn()
    .aintInstanceOf(Workflow)
  t.pass()
})

test('async / promises', async (t) => {
  // a promise that returns `result!` in 1 second
  const eh = new Promise(resolve => {
    setTimeout(() => resolve('result!'), 1000)
  })

  fosho(eh, t).promise()

  const awaited = await eh
  fosho(awaited, t).eq('result!')
})
