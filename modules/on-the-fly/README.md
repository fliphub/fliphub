# 🚁 on the fly

[![NPM version][onthefly-npm-image]][onthefly-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[onthefly-npm-image]: https://img.shields.io/npm/v/on-the-fly.svg
[onthefly-npm-url]: https://npmjs.org/package/on-the-fly
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam


> use typescript or es6+ config (or any) file on the fly, built in-memory, required into memory, without a footprint.


## 📦 installation

```bash
yarn add on-the-fly global
npm i on-the-fly -s -g
```

## 📘 examples

```js
const onTheFly = require('on-the-fly')
const dir = __dirname

// requires resolve(dir, config.js)
onTheFly('config.js', dir).then((config) => {
  console.log(config, typeof config)
})

// requires resolve(dir, config.js)
onTheFly('config.ts', dir).then((config) => {
  console.log(config, typeof config)
})
```

## 🖥 cli

#### simply:

```bash
onthefly config
```

#### or more verbose:

```bash
onthefly config.ts directoryHere
```
