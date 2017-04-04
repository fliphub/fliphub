# es5exports

[![NPM version][es5exports-npm-image]][es5exports-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[es5exports-npm-image]: https://img.shields.io/npm/v/es5exports.svg
[es5exports-npm-url]: https://npmjs.org/package/es5exports
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> easy named exports in es5

## 📦 usage
```bash
yarn add es5exports
npm i es5exports --save
```

## 📘 example

```js
const es5exports = require('es5exports')

const obj = {core: true}
const export1 = {prop1: true}
const export2 = {prop2: true}

exports.one = export1
exports.two = export2
exports['default'] = obj

module.exports = es5exports(exports['default'], exports)
```
