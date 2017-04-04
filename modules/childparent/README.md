# 👶 childparent

[![NPM version][childparent-npm-image]][childparent-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[childparent-npm-image]: https://img.shields.io/npm/v/childparent.svg
[childparent-npm-url]: https://npmjs.org/package/childparent
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> add child methods to parent, or parent methods to child, optionally binding thisArg, without dereferencing any args, 

## 📦 usage
```bash
yarn add childparent
npm i childparent --save
```

```js
const childToParentMethods = require('childparent')
```

## 📘 examples

```js
childToParentMethods({
  child: this,
  parent: anotherObject,
  thisArg: this,
})
```
