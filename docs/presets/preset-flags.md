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
  cb: (flags) => {},
}
```

### 📘 examples
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

### 🍦 defaults
- checks for `to` and `from` for flips
