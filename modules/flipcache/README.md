# 💾💸 flipcache


[![NPM version][flipcache-image]][flipcache-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipcache-image]: https://img.shields.io/npm/v/flipcache.svg
[flipcache-url]: https://npmjs.org/package/flipcache
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> [temporary], safe, restorable, cacheable, configurable, chainable/fluent data

## 📦 usage
```bash
yarn add flipcache
npm i flipcache --save
```

```js
const flipcache = require('flipcache')
```

## 📘 examples

```js
const onthefly = flipcache
  .from('fromfile').end()
  .to('otherfile')
  .autoRemove(2000)
```

```js
const mocha = flipcache
  .from('mochaOptsFile').end()
  .to('mochaOptsBackupFile')
  .autoRestore(2000)
```

```js
const datas = flipcache
  .from('./index.js')
  .load()
  .json()
  .update({eh: true})
  .parse() // optional, is done for you
  .clean()
  .write()
```

### 👣 dir

```js
const datas = flipcache
  .from('./index.js')
  .dir(__dirname)
  .json()
  .setIfNotEmpty({eh: true})
  .write()
```

### 👽 exports

```js
const {
  File,
  Files,
  Core,
  Cache,
  JSONChain,
  ConfigStore,
  FlipFind,
  fliphash,
} = require('flipcache')
```

## 🔗 more
- for json, [json-chain][json-chain] is used
- for resolving paths (unless .dir is used), [flipfind][flipfind] is used
- for all fs operations, [flipfile][flipfile] is used

[json-chain]: https://www.npmjs.com/package/json-chain
[flipfind]: https://www.npmjs.com/package/flipfind
[flipfile]: https://www.npmjs.com/package/flipfile
