# 💠💗 fliphub-core

[![NPM version][fliphub-core-npm-image]][fliphub-core-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[fliphub-core-npm-image]: https://img.shields.io/npm/v/fliphub-core.svg
[fliphub-core-npm-url]: https://npmjs.org/package/fliphub-core
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/green.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> the core of fliphub, an extensible hub api for building programs with an event-based core/workflow/context/presets

## 📦 usage
```bash
yarn add fliphub-core
npm i fliphub-core --save
```

```js
const FlipHubCore = require('fliphub-core')
```


## 🏛️ paradigm

### ❔ when

there are multiple things [context](#-context), one [core](#-core), one [workflow](#-workflow) to connect them, and reusable configurations that optionally can be inherited

### ❔ why

creating a program which has a core that is as minimal as possible
as much functionality is added via presets as possible

in turn, a phenomenal external api is created, since you use it to build your program.

this allows extremely easy maintenance and extension because





## 💗 core
- extends [flipchain/ChainedMapExtendable](https://www.npmjs.com/package/flipchain)
- your core program
- one core for every system
- every core has a core config
- high level





## 💮 workflow
- extends [flipchain/ChainedMapExtendable](https://www.npmjs.com/package/flipchain)
- connecting the core-hubs-context
- is passed into each lifecycle event to use one object to access the whole program easily




## ✳️ context
- extends [flipchain/ChainedMapExtendable](https://www.npmjs.com/package/flipchain)

## ⚙ configs
- options/config/opts/prefs/settings/args
- 🍉 rehydratable
- ⛓ chainable / fluent

#### 💗⚙ coreConfig
- user settings for your core, inheritable if `inherit` is not false

#### 💮⚙ contextContext
- configs per context, each context can have multiple configs if hubs extend, but it is usually just one


## 💠 hub

- is essentially [middleware][middleware-pattern], but a shorter name, and can do
- [decorators][decorator-pattern]
- [middleware][middleware-pattern]

[middleware-pattern]: https://en.wikipedia.org/wiki/Interceptor_pattern
[decorator-pattern]: https://sourcemaking.com/design_patterns/decorator




## 🍰 presets
- combinations of hubs, or/and configurations.


## 👂 events & 📚 docs
[🔗 events & docs](https://github.com/fliphub/fliphub/blob/master/modules/fliphub-core/readme-docs.md)





## 📘 examples


#### emitting
```js
// emits for core
this.workflow.evt.name('name-of-event-scoped-to->').core().emit(data)

// subscribe to a core event
this.workflow.evt.core().name('eh').cb(this.cb)

// emits for a single context
this.workflow.evt.name('name-of-event-scoped-to->').context('name').emit(data)

// emits for * contexts
this.workflow.evt.name('name-of-event-scoped-to->').contexts().emit(data)
```


## example (fliphub)
```js
workflow.contextsFrom(config.apps)
workflow.emitForContexts('merge.pre')
workflow.emitForContexts('init.pre')
workflow.emitForContexts('init')
workflow.emitForContexts('init.post')
workflow.emitForContexts('merge.post')
workflow.mapContexts((context) => {
  // edit context
  return context
})
```



### ☕💠 filterhub
- built in filtering for filtering contexts by calling the functions



### exports / extending

```js

// export as named, and as abstract for destructuring support
const {
  log,
  resolve,

  Core,
  AbstractCore,

  Context,
  AbstractContext,

  Workflow,
  AbstractWorkflow,

  Hub,
  AbstractHub,

  Presets,
  AbstractPresets,

  ChainedMap,
} = require('fliphub-core')
```







### 📦 deps
- [flipchain][deps-flipchain] for a powerful fluent chainable api
- [eventemitter2][deps-eventemitter2] in [Event][src-core-event] for fast event emitting lifecycle
- [fliplog][deps-fliplog] + [inspector-gadget][deps-inspector-gadget] for debugging

<!--
remap-by
arr-to-obj
deepmerge
deep-replace
lodash.camelcase
izz
lodash.forown
-->

# schema
- [core] 1 - 1 [workflow]
- [core] 1 - 1 [config]
- [workflow] 1 - * [hub]
- [workflow] 1 - * [context]
- [context] 1 - * [config]



[src-core-event]: https://github.com/fliphub/fliphub/blob/master/modules/fliphub-core/Events.js
[deps-eventemitter2]: https://github.com/asyncly/EventEmitter2
[deps-flipchain]: https://www.npmjs.com/package/flipchain
[deps-fliplog]: https://www.npmjs.com/package/fliplog
[deps-inspector-gadget]: https://www.npmjs.com/package/inspector-gadget
