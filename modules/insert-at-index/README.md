# [...🎯...] insert-at-index

[![NPM version][insert-at-index-npm-image]][insert-at-index-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[insert-at-index-npm-image]: https://img.shields.io/npm/v/insert-at-index.svg
[insert-at-index-npm-url]: https://npmjs.org/package/insert-at-index
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> insert a value, or an array, into an array at an index

## 📦 usage
```bash
yarn add insert-at-index
npm i insert-at-index --save
```

```js
const insertAt = require('insert-at-index')
```

## 📘 examples

```js
const list = [0, 1, 2, 3, 4]
const eh = ['canada', 'moose']

insertAt(list, 2, eh)

console.log(list)
```
