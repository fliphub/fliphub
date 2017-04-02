# on the fly 🚁
> use typescript or es6+ config (or any) file on the fly, built in-memory, required into memory, without a footprint.

## installation
```bash
yarn add on-the-fly global
npm i -s -g
```

## usage:

```js
const onTheFly = require('on-the-fly')
const dir = __dirname

// requires resolve(dir, config.js)
onTheFly('config.js', dir).then((config) => {
  console.log(config, typeof config)
})

// requires resolve(dir, config.js)
onTheFly('config.ts', dir).then((config) => {
  console.log(config, typeof config)
})
```

## cli
- simply: `onthefly config`
- or more verbose: `onthefly config.ts directoryHere`
