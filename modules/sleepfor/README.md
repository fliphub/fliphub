# 💤 sleepfor

[![NPM version][sleepfor-npm-image]][sleepfor-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[sleepfor-npm-image]: https://img.shields.io/npm/v/on-the-fly.svg
[sleepfor-npm-url]: https://npmjs.org/package/on-the-fly
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> sleep using while loops

## 📦 installation

```bash
yarn add on-the-fly global
npm i on-the-fly -s -g
```

## 📘 examples

```js
const sleepfor = require('sleepfor')
sleepfor(1000)
```

can also be used with async await

```js
await sleepfor(1000)
```


- for more enforced nodejs only sleeping, https://github.com/erikdubbelboer/node-sleep
