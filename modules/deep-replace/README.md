# 🕳 deep-replace

[![NPM version][deep-replace-npm-image]][deep-replace-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[deep-replace-npm-image]: https://img.shields.io/npm/v/deep-replace.svg
[deep-replace-npm-url]: https://npmjs.org/package/deep-replace
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> deep replace objects using property string, regex, fn match

## 📦 usage
```bash
yarn add deep-replace
npm i deep-replace --save
```

```js
const deepReplace = require('deep-replace')
```

## 📘 examples

```js
const {match} = require('deep-replace')

// obj, valueTest, propertyTest, decoratorFn
const fixture = {
  value: 'string',
  nested: {
    again: {
      again: 'string',
      object: {},
      array: [],
    },
  },
}

const valueTest = (value) => typeof value === 'string'
const propertyTest = null
const decorator = ({val, obj, prop}) => {
  obj[prop] = val + ' added me!'
}

match(object, valueTest, propertyTest, decorator)

// comes out as
// fixture.nested.again.again === 'string added me!'
// fixture.value === 'string added me!'

```
