## configOut
- writes the generated config to a file, for use with [babel-module-resolver][babel-module-resolver]
- ✔️💣🕸


## polyfills
- can be used currently only for polyfilling window when you `.exec` in [app operations](#app-operations)
### ⚠
- ✔️🕸
- needs docs
- [todo-polyfill][todo-polyfill]


## externals
- allows you to exclude paths from a bundle
- ✔️💣🕸
- [webpack externals][webpack-externals]
- [fuse exclude][fuse-arithmetic]


## 🍦 default settings
- [see the code][src-defaults]

### default defaults
```
{
  env: {
     production: {
       uglify: true,
       defineProduction: true,
       run: false,
       compile: true,
       useSourceMaps: false,
       sourceMapTool: 'hidden',
     },
     development: {
       noEmitErrors: true,
     },
  }
}
```

### adding your own defaults
this would make it so if `fusebox` [flag](#flags) are true, it would add the fusebox property to any app that has passed [filters](#filters) and is being built.
```js
fliphub.addDefaults({
  flags: {
    // this can also be a objects,
    // or an array of strings
    // or a string
    names: [{flag: 'fusebox', type: 'bool', default: false}],
    cb: ({fusebox}) => {
      return {fusebox}
    },
  },
})
```



# presets

## tests
- run tests in mocha
- run tests in karma
- ^ while running dev servers at the same time
