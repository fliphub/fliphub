const test = require('ava')

// this is chai.expect, and chai.should, fliplog, and fliplog
const {fosho, log, expect, should} = require('fosho')

class Workflow {}

// https://www.youtube.com/watch?v=d_XVVCVHGlQ&feature=youtu.be&t=9s
test('fosho', (t) => {
  fosho('eh')
    .isReal()
    .isStr()
    .str()
    .aintFunction()

  fosho('nice boulder')
    .str()
    .findString('nice')
    .findString('boulder')

  fosho(['one'])
    .lengthOf(1)
    .typeOf('array')

  fosho(1)
    .isAbove(0)
    .isBelow(2)
    .above(-1)
      .below(2)
})

test('fosho not a nice boulder...', (t) => {
  t.throws(() => {
    fosho({niceBoulder: true})
      .isReal()
      .isObj()
      .instanceOf(Workflow)
  })
})

test('plan fosho', (t) => {
  t.plan(2)
  fosho({niceBoulder: true}, t)
    .isReal()
    .isObj()
})

test('fns', (t) => {
  const fnb = () => {}
  function func() {}

  fosho(fnb)
    .fn()
    .aintBindable()
  fosho(func)
    .isFunction()
    .bindable()
    .all(['function', 'bindable'])

  fosho(fnb)
    .fn()
    .aintInstanceOf(Workflow)
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
