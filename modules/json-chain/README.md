# 🎀⛓ json-chain

> fluent chaining for json with dot-prop access

[![NPM version][json-chain-npm-image]][json-chain-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[json-chain-npm-image]: https://img.shields.io/npm/v/json-chain.svg
[json-chain-npm-url]: https://npmjs.org/package/json-chain
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

## 📦 usage
```bash
yarn add json-chain
npm i json-chain --save
```

```js
const JSONChain = require('json-chain')
```

## 📘 examples

```js
const data = {
  eh: ['og'],
  canada: true,
}

const chain = JSONChain.init(data).update('eh', ['some values'])
```

## 👓 reading json file

```js
const {readFileSync} = require('fs')

const pkg = readFileSync('./package.json', 'utf8')
const chain = new JSONChain(pkg)
  .parse() // will be done automatically, is optional
  .set('eh', ['some values']) // also as .update
  .del('eh') // also as .delete, .remove

// also as .val
const test = chain.get('scripts.test')
const has = chain.has('version')
```

## ✍ writing to file
- has `.toString` and `.toJSON` methods for auto-stringifying when cast to `string` or `JSON.stringify`

## 👾 keep it simple
```js
const chain = new JSONChain(pkg)
  .updateIfNotEmpty('scripts.test', 'ava --verbose')
  .updateIfNotEmpty('scripts.devDependencies', {'ava': '*'})
  .write()
```
