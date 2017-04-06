# 🎯 fliphub-resolve

[![NPM version][fliphub-resolve-npm-image]][fliphub-resolve-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[fliphub-resolve-npm-image]: https://img.shields.io/npm/v/fliphub-resolve.svg
[fliphub-resolve-npm-url]: https://npmjs.org/package/fliphub-resolve
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

## 📦 usage
```bash
yarn add fliphub-resolve
npm i fliphub-resolve --save
```


- if it's a monorepo package, it will default resolve relative to the monorepo root
- otherwise, it will default resolve relative to the the package root
- the root can be set once, and all other resolving using it will default to that root
- the root can be set for multiple scopes

### [flipfile](https://www.npmjs.com/package/flipfile) used to detect
### [🥕 mono-root](https://www.npmjs.com/package/mono-root) to find root


```js
const resolve = require('fliphub-resolve')
resolve('./path-from-root')
```

## 📘 examples

## scope

```js
// resolve all with this scope
const localResolver = resolve.scoped('local', __dirname)

// default is monorepo
const monoResolver = resolve.scoped('mono')

// how many folders to check up
const appResolver = resolve.scoped('app').setRoot(1)
```

- a `number` can be passed for shorthand `depth`

## obj
- forProps, fn

```js
const obj = {
  fixtures: './fixtures',
  simple: './fixtures/somePath',
  simplejs: './fixtures/somePath.js',
}

// all properties resolved to absolute paths, if they are relative
const resolvedObj = resolve.obj(obj)
```


## arr
- resolves objects, arrays, with multiple scopes.

```js
const arr = ['./fixtures', './fixtures/somePath']

// all relative strings in the array are resolved
const resolvedArr = resolver.arr(arr)
```

## auto

```js
const arr = ['./fixtures', './fixtures/somePath']
const obj = {
  fixtures: './fixtures',
  simple: './fixtures/somePath',
  simplejs: './fixtures/somePath.js',
}

// will auto-resolve based on type
const resolvedArr = resolver(arr)
const resolvedObj = resolve(obj)
```

## resolve-scoped

```js
// or resolve with a scope
const apps = resolve.scope('app')('./eh.js')
const monos = resolve.scope('mono')('./eh.js')
const locals = resolve.scope('app')(arr)
```
