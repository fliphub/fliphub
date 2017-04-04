# does include

[![NPM version][does-include-npm-image]][does-include-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[does-include-npm-image]: https://img.shields.io/npm/v/does-include.svg
[does-include-npm-url]: https://npmjs.org/package/does-include
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> find whether a string (or arr<string>) contains any, or all of another array of strings.


## 📦 usage
```bash
yarn add does-include
npm i does-include --save
```

```js
const does-include = require('does-include')
```


## 📘 examples

```js
/**
 * @param  {Array<string> | string} haystack
 * @param  {Array<string>} needles
 * @param  {boolean} any
 * @return {boolean}
 */
const doesInclude = require('does-include')

// or can be destructured
const {any, all} = require('does-include')
```

## any (default)
```js
const doesInclude = require('does-include')

// can is in canada, so true.
doesInclude('canada', ['eh', 'can'])
```

## all
```js
const doesInclude = require('does-include')

// last argument is `any` (default true)
// 'canada' and 'can' are both in it, so true
doesInclude('canada', ['canada', 'can'])
```
