## 🚩 flags
flags can be used to find global variables passed around for configuration
from [globals][node-global]

### defaults
```js
flags: {
  names: [
    {flag: 'compile'},
    {flag: 'exec'},
    {flag: 'run'},
    {flag: 'test'},
  ],
  cb: ({compile, exec, run, test}) => {
    var decorated = {compile, exec, run, test}
    if (test) {
      if (decorated.presets) {
        decorated.presets.push('test')
        decorated.presets.push('mocha')
      }
      else decorated.presets = ['test', 'mocha']
    }
    // helpers.log.verbose(decorated)
    return decorated
  },
}
```

### examples
```js
flags: [
  {
    names: ['html'],
    cb({html}) {
      if (!html) return {}
      var template = `./back/verbose/${html}.html`
      return {html: [{template}]}
    },
  },
  {
    names: [{flag: 'run', type: 'bool', default: false}],
    cb({run}) {
      return {run}
    },
  },
],
```

## ♼ environment
is an extension of [flags](#flags) as a middleware using flags

### defaults
```js
env: {
  production: {
    uglify: true,
    defineProduction: true,
    run: false,
    compile: true,
    sourceMaps: false,
    sourceMapTool: 'hidden',
  },
  development: {
    noEmitErrors: true,
  },
}
```
