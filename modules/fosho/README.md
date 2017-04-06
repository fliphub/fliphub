# 💯 fosho

[![NPM version][fosho-npm-image]][fosho-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[fosho-npm-image]: https://img.shields.io/npm/v/fosho.svg
[fosho-npm-url]: https://npmjs.org/package/fosho
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> don't just be sure, be fosho.

![https://github.com/fliphub/fliphub](https://media.giphy.com/media/xT0BKk9aPtLzKJiUi4/giphy.gif)

## best of the best
### extends
- [x] extends [izz](https://www.npmjs.com/package/izz)
- [x] extends [chai assert](http://chaijs.com/api/assert/)
- [x] extends [chai should](http://chaijs.com/guide/styles/#should)
- [x] extends [fuse-box-test-runner](https://github.com/fuse-box/fuse-test-runner)

### foshizzle
- [x] has fluent chaining
- [x] supports avajs assertion planning
- [x] has shortest assertions, and the longest `.isStr()` or `.str()`
- [x] it's not not... it aint: `.aintReal()`
- [x] uses [power-assert](https://github.com/power-assert-js/power-assert)



## 📦 usage
```bash
yarn add fosho
npm i fosho --save
```

# 📘 examples

### example (avajs)
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

## exports

it also exports [fliplog](https://www.npmjs.com/package/fliplog) [chai assert](http://chaijs.com/api/assert/) and [chai should](http://chaijs.com/guide/styles/#should)


```js
const {fosho, log, should, assert} = require('chai')
```

### resources
- https://lingojam.com/IzzleTranslator
