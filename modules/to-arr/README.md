# [to-arr]

[![NPM version][to-arr-npm-image]][to-arr-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[to-arr-npm-image]: https://img.shields.io/npm/v/to-arr.svg
[to-arr-npm-url]: https://npmjs.org/package/to-arr
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> take any value, turn it to an array if it is not already one

## 📦 usage
```bash
yarn add to-arr
npm i to-arr --save
```

```js
const toArr = require('to-arr')
```

## 📘 examples

makes it very easy to loop over arguments without having to deal with checks

### safety

```js
function doSomethingCrazy(arg) {}
const allOpts = {includeEmpty: true}
const splitOpts = {split: '-'}
const loopData = (args) => toArr(args).forEach(doSomethingCrazy)
const loopAllData = (args) => toArr(args, allOpts).forEach(doSomethingCrazy)
const loopSplit = (args) => toArr(args, splitOpts).forEach(doSomethingCrazy)

// will loop an empty array, 0 iterations
loopData(null)

// will loop an array including null
loopAllData(null)

// loops 3 strings
const arrOfStrs = toArr('string1-string2-string3')
```


### strings

```js
const arrOfStrs = toArr('string1,string2,string3')
const arrOfStr = toArr('just one array entry')
```

### objects & arrays

```js
const obj = {luke: 'use the strings, forget me'}
const keys = toArr(obj, {keys: true})

const objs = toArr(obj)
const objs = toArr(objs)
console.assert(objs === objs)
```
