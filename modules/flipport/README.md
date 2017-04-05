# 🙃🛳 flipport

[![NPM version][flipport-npm-image]][flipport-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipport-npm-image]: https://img.shields.io/npm/v/flipport.svg
[flipport-npm-url]: https://npmjs.org/package/flipport
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> find if a port is available, fallback to first open port if not.

## 📦 usage

```bash
yarn add flipport
npm i flipport --save
```

## 📘 examples

```js
const flipport = require('flipport')
flippoort(8000).then(port => {
  // you have an availe port!
})
```
