const test = require('ava')
const {fosho, log} = require('fosho')

class Workflow {}

test.only('fosho', (t) => {
  fosho('eh')
    .isReal()
    .isStr()
    .str()
    .aintFunction()
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

  fosho('nice boulder')
    .str()
    .findString('nice')
    .findString('boulder')

  fosho(['one'])
    .lengthOf(1)
    .typeOf('array')

  fosho(1)
    // .beAbove(0)
    // .beBelow(2)
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

// https://github.com/avajs/ava/blob/9fdf234b8b8fe679e31086014d604c25294ebf10/test/test.js
test.skip(`plan fosho -
  fails when asserting less than planned -
  dont know how to make it intentionally fail with .plan`, (t) => {
  t.plan(1)
  fosho({niceBoulder: true}, t)
    .isReal()
    .isObj()
})
