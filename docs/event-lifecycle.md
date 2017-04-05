## 👂📢 events


the events emitted are

```js
core.config
contexts.create.start
contexts.configs.start
context.*.create
context.*.config.pre
context.*.config
context.*.config.post
context.*.merge.pre
context.*.merge.post
context.*.init
context.*.init.post
contexts.configs.done
contexts.create.done
```

any class extending [hub][https://github.com/fliphub/fliphub/blob/master/modules/fliphub-core/Hub.js] will have the following methods subscribed to the events, if they exist.

```js
preConfigs
preCreates
postConfigs
postCreates
preInit
init
postInit
onCreate
onConfig
preConfig
postConfig
coreCreate
coreConfig
coreInit
coreSetup
```
