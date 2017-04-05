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


# 🏰 benefits

writing an api using flipchain means writing a single fluent api, but getting 3 apis as a result!
-  🍉 rehydratable configurations
- ⛓ fluent chainable api
- 🍦 object configs that are easily merged deep


# 📘 examples

## 👋 intro

```js
const ChainedMap = require('./ChainedMapExtendable')

class EasyFluent extends ChainedMap {
  constructor(parent) {
    super(parent)

    // extend a list of strings for easy chainable methods
    this.extend(['eh'])

    // same as .extend,
    // but when called with no arguments,
    // default is used (`true` in this case)
    // third param is optionally a prefix for inversified
    // for example, `no` => `noCanada()` for inverse value
    this.extendPrefixed(['canada'], true, 'no')
  }

  // if more advanced data changes are needed
  // or if the syntax is preferred for use with typescript or flowtype
  // .set, .get, .has are available
  igloo(igloo) {
    this.set('igloo', igloo)
    return this
  }

  toConfig() {
    return this.entries()
  }
}

// {igloo: 'fire', canada: false, eh: 'moose'}
const config = new EasyFluent()
  .igloo('fire')
  .noCanada()
  .eh('moose')
  .toConfig()

// this is == config
const hydrated = new EasyFluent()
  .from(config)
  .toConfig()

// canada is now true
const merged = new EasyFluent()
  .merge(config)
  .merge({canada: true})
  .toConfig()
```


## 🕳🏊 advanced

```js
const ChainedMap = require('./ChainedMapExtendable')
const ChainedSet = require('./ChainedSet')

class Advanced extends ChainedMap {
  static init(parent) {
    return new Advanced(parent)
  }
  constructor(parent) {
    super(parent)
    this.list = new ChainedSet(this)
    this.extend(['eh'])
    this.extendWith(['canada'], true)
  }

  addName(name) {
    this.list.add(name)
    return this
  }

  igloo(igloo) {
    this.set('igloo', igloo)
    return this
  }

  toConfig() {
    return Object.assign(this.entries(), {
      list: this.list.values().map(name => name),
    })
  }

  // since we have additional data that is not simple key value
  // we do additional (albeit easy) steps to rehydrate
  from(obj) {
    super.from(obj)

    Object
      .keys(obj)
      .forEach(key => {
        const val = obj[key]
        switch (key) {
          case 'list': return val
            .filter(name => name)
            .forEach(name => this.addName(name))
        }
      })

    return this
  }

  // same with `from`
  // we do additional simple steps to merge in lists
  merge(obj) {
    Object
      .keys(obj)
      .filter(key => obj[key])
      .forEach(key => {
        const val = obj[key]
        switch (key) {
          case 'list': return val
            .filter(name => name)
            .forEach(v => this.addName(v))
        }
      })

    // built-in merging
    // can use `.mergeReal` to merge only `real` values
    // and `.merge` to merge any
    super.merge(obj)

    return this
  }
}

const chain = Advanced
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

const hydrated = Advanced
  .init()
  .from(result)
  .toConfig()

const merged = Advanced
  .init()
  .merge(hydrated)
  .merge({igloo: 'whaaaat'})

// can use toConfig,
// and safely continue editing `merged`
// with a snapshot of the object data saved as `mergedResult`
const mergedResult = merged.toConfig()

// hydrated === result === {
//   igloo: 'brr',
//   canada: 'canada',
//   eh: 'eh!',
//   list: [ 'thing one', 'thing two' ]
// }

// merged === {
//   igloo: 'whaaaat',
//   canada: 'canada',
//   eh: 'eh!',
//   list: [ 'thing one', 'thing two' ]
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
