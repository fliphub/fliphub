# ⛓⏲ fliptime

[![NPM version][fliptime-image]][fliptime-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]

[fliptime-image]: https://img.shields.io/npm/v/fliptime.svg
[fliptime-url]: https://npmjs.org/package/fliptime
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby

> fluent timer with laps, microtime + parsing, multiple timers, (fallback to performance & Date), shorthand diffs & specifications

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

### ⚖️ tillNow

diff for each: milliseconds, seconds, minutes, hours, days, years.


```js
const now = Date.now()
sleepfor(60000)
const {ms, s, m, h, d, y} = timer.tillNow(now)

// ms === 60000
// s === 60
// m === 1
// h === 0
// d === 0
// y === 0


```

### ⚖️ tillNowSatisfies

check that the difference is `equal or greater than` specification.

```js
const then = Date.now()
sleepfor(60000)

// seconds, hours, minutes, days, years...
// or shorthand: s, h, m, d, y
//
// true: >= 60 seconds
const satisfies = timer.tillNowSatisfies(then, {seconds: 60})
```

### 🏊 additional

```js
const now = timer.microtime.now()
const micro = timer.parseMicro(now)

timer.times = {}
timer.laps = {}
timer.index = 0
```

#### example
```js
timer.times[name].start
timer.times[name].end
timer.times[name].diff
```
