# 🥕 mono-root

[![NPM version][mono-root-npm-image]][mono-root-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[mono-root-npm-image]: https://img.shields.io/npm/v/mono-root.svg
[mono-root-npm-url]: https://npmjs.org/package/mono-root
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> find the root path in monorepos


## 📦 usage
```bash
yarn add mono-root
npm i mono-root --save
```

## 📘 examples


### simple

```js
const {resolve} = require('path')
const monoRoot = require('mono-root')()

const pkg = resolve(monoroot, './package.json')
console.log(pkg)
```

### advanced

- the max `depth` it goes up can be customized
- and it can be returned as an object (`asObj`) to see the paths it used

```js
const {resolve} = require('path')
const monoRoot = require('mono-root')

const {
  nearest,
  farthest,
  attempt,
  found,
} = monoRoot({depth: 4, asObj: true})
```

## more
- see [🎯 fliphub-resolve](https://www.npmjs.com/package/fliphub-resolve) for more verbose use that resolves objects, arrays, with multiple scopes.
