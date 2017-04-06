# {arr-to-obj}

[![NPM version][arr-to-obj-npm-image]][arr-to-obj-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[arr-to-obj-npm-image]: https://img.shields.io/npm/v/arr-to-obj.svg
[arr-to-obj-npm-url]: https://npmjs.org/package/arr-to-obj
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> convert arrays to objects, with customizers. (values as keys, keys as values, values as values and keys)

## 📦 usage
```bash
yarn add arr-to-obj
npm i arr-to-obj --save
```


## default
#### (also can be used as valAsKeyAndVal)

```js
const arrToObj = require('arr-to-obj')
const obj = arrToObj(['eh', 'canada'])
// {eh: eh, canada: canada}
```

## valAsKey
```js
const {valAsKey} = require('arr-to-obj')
const obj = valAsKey(['eh', 'canada'], 'woot')
// {eh: 'woot', canada: 'woot'}
```

## valAsVal
```js
// @example:
// var array = ['eh', 'canada']
// valAsVal(array)
const {valAsVal} = require('arr-to-obj')
const obj = valAsVal(['eh', 'canada'])
// {'1': 'eh', '2': 'canada'}
```

## custom
```js
const arrToObj = require('arr-to-obj')
const arr = ['eh', 'canada']

// does the same as #valAsKey
// {eh: 'woot', canada: 'woot'}
const obj = arrToObj(array, {
  valFn: () => undefined,
  keyFn: ({i, val}) => typeof fn === 'function' ? fn(val, i) : (fn || i),
})
```

### resources
- https://www.npmjs.com/package/array-to-object (outdated, not customizable)
