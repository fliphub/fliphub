# presets - add your own

[hubs]: https://github.com/fliphub/fliphub/wiki/hubs
[presethub]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/hubs/PresetHub.js
[BundlerConfig]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/core/configs/Bundler.js
[CoreConfig]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/core/configs/Core.js
[ContextConfig]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/core/configs/ContextConfig.js

## methods

- similar to [hubs][hubs], there are lifecycle methods available, however, these are not done through event emitting, they are done using the [built-in PresetHub][presethub] - the same functionality could be achieved by adding your own hub.
- all of the methods are optional

### flips
- depending on the flips, one `from<Name>`, and one `to<Name>` will be called per context (if they exist on the preset)
- in the `to<Name>`,
  - the arguments passed in can be changed by calling methods to merge, set, get, or anything by reference
  - if the returned value is a `real` value, it will be merged into the [BundlerConfig][BundlerConfig]

```js
class CustomPreset {
  constructor() {
    this.args = {}
  }

  setArgs(args) {
    if (args) this.args = args
  }

  coreInit(workflow) {}

  decorate(context, bundler, workflow) {}
  postDecorate(context, bundler, workflow) {}

  init(workflow) {}

  fromWebpack(bundlerConfig, workflow) {}
  fromRollup(bundlerConfig, workflow) {}
  fromFuseBox(bundlerConfig, workflow) {}

  toWebpack(bundlerConfig, workflow) {}
  toRollup(bundlerConfig, workflow) {}
  toFuseBox(bundlerConfig, workflow) {}
}
```


### as object

```js
const flips = new FlipHub({
  apps: [{
    presets: {
      eh: new CustomPreset(),
    },
    name: 'canada',
    entry: './src/index.js',
    output: './public/canada',
  }],
})
```

### as chain

```js
const flips = FlipHub.init({
  apps: [{
    name: 'canada',
    entry: './src/index.js',
    output: './public/canada',
  }],
}).create()

flips.addPresets({
  eh: new CustomPreset('your initial non-built-in args if needed'),
})

flips.usePresets({
  eh: 'arguments that would be passed in by .setArgs',
})
```
