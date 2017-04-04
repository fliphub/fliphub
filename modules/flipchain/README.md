# ⛓ flipchain

[![NPM version][flipchain-npm-image]][flipchain-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipchain-npm-image]: https://img.shields.io/npm/v/flipchain.svg
[flipchain-npm-url]: https://npmjs.org/package/flipchain
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam


> core chaining library, heavily based on  [webpack-chain](https://github.com/mozilla-rpweb/webpack-chain), but not webpack-specific.


# 📘 examples


```js
const ChainedMap = require('flipchain/ChainedMapExtendable')
const ChainedSet = require('flipchain/ChainedSet')


class EasyFluent extends ChainedMap {
  static init(parent) {
    return new EasyFluent(parent)
  }
  constructor(parent) {
    super(parent)
    this.list = new ChainedSet(this)

    // extend a list of strings for easy chainable methods
    this.extend(['eh'])

    // same as .extend,
    // but when called with no arguments,
    // default is used (`true` in this case)
    // third param is optionally a prefix for inversified
    // for example, `no` => `noCanada()` for inverse value
    this.extendWith(['canada'], true)

    // using `izz` to validate types when setting
    // this.extendType(['str'], 'string')
  }

  addName(name) {
    this.list.add({name})
    return this
  }

  // if more advanced data changes are needed
  // .set, .get are available
  igloo(igloo) {
    this.set('igloo', igloo)
    return this
  }

  toConfig() {
    return Object.assign(this.entries(), {
      nameList: this.list.values().map(val => val.name),
    })
  }
}

const chain = EasyFluent
  .init()
  .igloo('brr')
  .canada()
  .eh('eh!')
  .addName('thing one')
  .addName('thing two')

// true, `eh!`
chain.has('igloo')
chain.get('eh')

const result = chain.toConfig()

// result === {
//   igloo: 'brr',
//   canada: 'canada',
//   eh: 'eh!',
//   nameList: [ 'thing one', 'thing two' ]
// }

```




# 🌐 api
- every chain has `.className` for easy debugging
- every chain has this.parent
- and this.parent is hidden on inspection by [🕵🗜 inspector-gadget](https://www.npmjs.com/package/inspector-gadget) for easier debugging

### ChainedSet
- [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set)
- prepend => this
- clear => this
- delete => this
- values => array of entries
- has => boolean
- merge => merge an object into the chain
- when => conditional instance callback

### ChainedMap
- [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)

#### extendAlias
- `(methodsToAlias: Array<string>, methodToAlias: string, [thisArg])`
- alias a list of methods
- @returns `this`

### from
- `(obj: Object)`
- checks each property of the object
- calls the chains accordingly
- rehydrates a chain from an object


### other
- decorateParent (using [childparent](https://www.npmjs.com/package/childparent))
- clear() => this // clearsAll
- delete(key) => this
- entries => {keysAndValues}
- values => Object.values
- get(key) => entry
- has(key) => boolean
- set(key, val) => this

##### if key is an array, merge in the value,
##### usually should use ChainedSet for this
- concat(key, val) => this
- append(key, val) => this

##### merging
- mergeReal(obj) => this // only merges non-undefined values
- merge(obj) => this
- clean => this
- when => conditional instance callback




# 🔗 links & more

- [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)

#  `chainMapTill`
lets you chain until the required keys are set via chains, or if they are passed in, then it auto returns `parent`

# `chainedMapExtendable`
- has chains with `.extends` able to use `default` values when calling it
- also can add `prefixes` (default `no`) so if you use `cache` default `true`, it can add `noCache` which does the inverse
- set up for being chains of chains when you add a few decorating chains dynamically


# 📝🌊 TODO

```js
  // using `izz` to validate types when setting
  this.extendType(['str'], 'string')
```
