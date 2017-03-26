# fosho
> don't just be sure, be fosho.

![https://github.com/fliphub/fliphub](https://media.giphy.com/media/xT0BKk9aPtLzKJiUi4/giphy.gif)

## best of the best
### extends
- [x] extends [izz](https://www.npmjs.com/package/izz)
- [x] extends [chai assert](http://chaijs.com/api/assert/)
- [x] extends [chai should](http://chaijs.com/guide/styles/#should)
- [x] extends [fuse-box-test-runner](https://github.com/fuse-box/fuse-test-runner)
- [x] supports optional second arg for [power-assert](https://github.com/power-assert-js/power-assert)

### foshizzle
- [x] has fluent chaining
- [x] supports avajs assertion planning
- [x] has shortest assertions, and the longest `.isStr()` or `.str()`
- [x] it's not not... it aint: `.aintReal()`


# example (avajs)
```js
const test = require('ava')
const fosho = require('fosho')

class Workflow {}

test('fosho', (t) => {
  fosho('eh')
    .isReal()
    .isStr().str() // long or short hands
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
    .beAbove(0)
    .beBelow(2)
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

// works with assertion planning
test('plan fosho', (t) => {
  t.plan(2)
  fosho({niceBoulder: true}, t)
    .isReal()
    .isObj()
})
```
