# 👂📢 event-lifecycle

### 📢 emitted

the events emitted are:

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

### 🏊
- any class extending [hub][src-hub] will have the following methods subscribed to the events, if they exist.
- see [hubs][src-hub] and [presets][presets-add-your-own] for more on how the events are used
- [see the fliphub-core docs][docs-fliphub-core]

[src-hub]: https://github.com/fliphub/fliphub/blob/master/modules/fliphub-core/Hub.js
[presets-add-your-own]: https://github.com/fliphub/fliphub/wiki/presets-add-your-own
[docs-fliphub-core]: https://github.com/fliphub/fliphub/tree/master/modules/fliphub-core
