# ⚙ config

- all fliphub-only properties are optional
- all options from any [build-system][build-systems] can be passed in to each app

fliphub takes in configs from [any supported build-system][build-systems], and using [presets][docs-presets], translates supported properties from one bundler to another


### parent config
  - inheritable by each app
  - when using a single app, the parent config is the app config
  - same properties as app, but
    - no name
    - no bundler properties
    - has the apps property

### app
  - shortname for [`context`](#context)
  - presets: `Object` | `Array<string>`
  - flips:
    - `from`
      - bundler the config is currently, defaults to webpack
    - `to`
      - `Array<Bundler>` | `Bundler` (`'webpack', 'fusebox', 'rollup'`)
      - bundler the config is targeting, default webpack
  - inherit: `boolean`, whether to inherit the parent config
  - root: `string`, path to resolve paths to
  - defaults: `boolean`, disables all built-in defaults


#### 📝
- see presets
- see hubs
- see examples


##### 🏊 deeper


## 🎒 bundler

### ⚙ bundler.config

### 🌐 bundler.api
- is a wrapper around any of the [supported-build-systems][build-systems]
- [src code][src-bundler-api]

## ✳️ context
- shortened to `app` in the config
- [see fliphub-core-context][docs-core-context]
- [src code][src-context]

### ⚙ context.config


## 💗 core

## ⚙ coreConfig

- see bundler config
- see core config
- see context config

[src-bundler-api]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/hubs/Bundlers
[src-context]:
[docs-core-context]: https://github.com/fliphub/fliphub/wiki/core#%EF%B8%8F-context
[docs-presets]: https://github.com/fliphub/fliphub/wiki/presets
[docs-presets]: https://github.com/fliphub/fliphub/wiki/presets
[build-systems]: https://github.com/fliphub/fliphub/wiki/supported-build-systems
