# on the fly
> use typescript or es6+ config (or any) file on the fly, built in memory

## usage:

```js
const onTheFly = require('on-the-fly')
const dir = __dirname

// outputs to .flip/babeled.js
onTheFly('config.js', dir, 'babeled').then((config) => {
  console.log(config, typeof config)
})

// outputs to .flip/typescripted.js
onTheFly('config.ts', dir, 'typescripted').then((config) => {
  console.log(config, typeof config)
})
```

## cli
- simply: `onthefly config`
- or more verbose: `onthefly config.ts srcDirectoryHere outputFolderHere`
