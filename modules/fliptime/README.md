# ⛓⏲ fliptime
[![NPM version][npm-image]][npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[npm-image]: https://img.shields.io/npm/v/fliptime.svg
[npm-url]: https://npmjs.org/package/fliptime
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby

## usage
```bash
yarn add fliptime
npm i fliptime --save
```

```js
const timer = require('fliptime')
```

uses [microtime](https://github.com/wadey/node-microtime) formatted with [microseconds](https://github.com/kamicane/microseconds)


### simple

```js
timer.start('canada')
setTimeout(() => timer.end('canada').log('canada'), 500)
```

### laps
```js
timer.start('canada')
const lapper = setInterval(() => {
  timer.lap('canada')
}, 1000)
setTimeout(() => clearInterval(lapper), 10000)
timer.logLaps('canada')
```

### took

```js
timer.start('canada')
setTimeout(() => console.log(timer.end('canada').took('canada')), 500)
```

### multiple

```js
const sleepfor = require('sleepfor')
timer.start('eh')
timer.start('canada')

sleepfor(100)
timer.lap('canada')
timer.stop('eh')
sleepfor(100)
timer.lap('canada')

timer
.stop('canada')
.log('eh')
.log('canada')
.logLaps('canada')

// second param is whether to use laps
const lapTime = timer.msTook('canada', true)
```

### formats
```js
timer.start('eh')
timer.stop('eh')

const microseconds = timer.took('eh')
const ms = timer.msTook('eh')
const parsed = timer.parsedTook()
```
