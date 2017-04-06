# 🗺 remap-by

[![NPM version][remap-by-npm-image]][remap-by-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[remap-by-npm-image]: https://img.shields.io/npm/v/remap-by.svg
[remap-by-npm-url]: https://npmjs.org/package/remap-by
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> remap object or array by a property

## 📦 usage
```bash
yarn add remap-by
npm i remap-by --save
```

```js
const remapby = require('remap-by')
```

## 📘 examples


### object

```js
const list = {
  eh: {id: 'eh', val: 'canada'},
  igloo: {id: 'moose', val: 'igloo'}
}

const remapped = remapBy(list, 'id')

// remapped === {
//  'eh': {id: 'eh', val: 'canada'},
//  'moose': {id: 'moose', val: 'igloo'}
// }
```


### array

```js
const list = [
 {id: 'eh', val: 'canada'},
 {id: 'moose', val: 'igloo'}
]

const remapped =

// remapped === {
//  'eh': {id: 'eh', val: 'canada'},
//  'moose': {id: 'moose', val: 'igloo'}
// }
```
