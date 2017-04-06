# 🙃 🚩 flipflag

[![NPM version][flipflag-npm-image]][flipflag-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipflag-npm-image]: https://img.shields.io/npm/v/flipflag.svg
[flipflag-npm-url]: https://npmjs.org/package/flipflag
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam


> cli flags with aliases, from argv, env, globals, --env.flags, callbacks, preserves casing and searches original case, uppercase, lowercase

## 📦 usage
```bash
yarn add flipflag
npm i flipflag --save
```

```js
const flags = require('flipflag')
```


# 📘 examples

## easy

```js
const envs = flags('--env')
const nullVal = flags('nonExistantForAllCases')
```


## aliases, callbacks

```js
const names = [
  'cache',

  // last one is the key
  'o,operations,ops',
]

const flags = [{
  names,
  cb: ({ops, cache}) => {

  },
}]

flipflag.findAll(flags)
```

## defaults & types

```js
const apps = flags('apps', {type: 'arr', default: false})
```

## exports

```js
const {
  aliased,
  addAliases,
  parseAliases,
  findAndDecorate,
  decorate,
  findAll,
  searchAll,
  val,
  get,
  argv,
  minimist,
} = require('flipflag')
```


## ⚡ perf

takes ~1ms to search for process.env flags, 60 microseconds searching argv, 40 microseconds to search globals. see test/examples for more.
