# 🔦 expose-hidden

[![NPM version][expose-hidden-npm-image]][expose-hidden-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[expose-hidden-npm-image]: https://img.shields.io/npm/v/expose-hidden.svg
[expose-hidden-npm-url]: https://npmjs.org/package/expose-hidden
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> When extending objects in nodejs, `Object.keys`, `Object.getOwnPropertyNames`, even `for in` may not give you all of the methods on the object. Use expose hidden to re-expose the hidden methods.

## 📦 usage
```bash
yarn add expose-hidden
npm i expose-hidden --save
```

## 📘 example

```js
const exposeHidden = require('expose-hidden')
class Eh {
  hidden1() {}
  hidden2() {}
}
const eh = new Eh()

// @returns eh, it mutates so it does not need to return, but for convenience
exposeHidden(eh, thisArgToBindWith)

// using false will expose, but will not bind
exposeHidden(eh, false)
```
