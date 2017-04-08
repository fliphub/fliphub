## 🍰 presets

can be used as an array to use the default options

```js
const apps = [{
  presets: ['alias-resolve', 'neutrino-preset-web', 'eslint'],
}]
```

or an object to pass in arguments

```js
const apps = [{
  presets: {
    aliasResolve: __dirname,
    presetWeb: null,
    eslint: require('./.eslintrc.js')
  },
}]
```


### add your own presets
```js
class CustomPreset {
  setArgs(args) {
    this.args = args
  }
  toWebpack() {
    this.args().isTrue()
  }
}
```

### built-in presets

[👀 see the built in presets code][src-presets]

![built-in](https://cloud.githubusercontent.com/assets/4022631/24596137/d6701e94-17f1-11e7-8fff-61a5e1b6baca.png)


### neutrino presets

all [🔗 neutrino presets and middleware][neutrino-docs] are compatible with fliphub.

![neutrino-presets](https://cloud.githubusercontent.com/assets/4022631/24596136/d66fc43a-17f1-11e7-94ec-35ed09198891.png)


[neutrino-docs]: https://neutrino.js.org/presets/
[src-presets]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/presets
