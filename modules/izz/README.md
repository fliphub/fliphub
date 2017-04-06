# izz

[![NPM version][izz-npm-image]][izz-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[izz-npm-image]: https://img.shields.io/npm/v/izz.svg
[izz-npm-url]: https://npmjs.org/package/izz
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> is type shorthands, hundreds of type checks, modular exports

## 📦 usage
```bash
yarn add izz
npm i izz --save
```

```js
const izz = require('izz')

// also available with modular imports
const isPromise = require('izz/promise')
const isNumber = require('izz/num')
const isBindable = require('izz/bindable')
const isGlob = require('izz/glob')
const isCi = require('izz/ci')
const isWindows = require('izz/windows')

const isArrOf = require('izz/arrOf')
console.log(isArrOf(['strings?', 'all stringy'], 'string'))
```

- [x] extends [is](https://www.npmjs.com/is)
- [x] extends [is_js](https://is.js.org)

## fns
- is.bindable
- is.promise
- is.arrOf
- is.num/number
- is.class
- is.obj/object/objLike/objectLike/plainObj/plainObject
- is.hostObj/hostObject
- is.emptyObj/emptyObject
- is.emptyStr/emptyString
- is.set
- is.map
- is.ci
- is.win/windows
- is.gen/generator
- is.fn/func/function
- is.str/string
- is.instanceOf
- is.real/notReal
- is.toType (returns string of type)
- is.arrOf
- is.glob

## todo
- update docs with full api
