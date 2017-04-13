// https://github.com/firefoxes/diff-hrtime/blob/master/diffHrtime.js
// https://github.com/wadey/node-microtime
let microtime

try {
  microtime = require('microtime')
} catch (e) {
  microtime = Date
}

if (typeof window !== 'undefined' && typeof performance !== 'undefined') {
  microtime = performance
}

class Timer {
  constructor() {
    this.times = {}
    this.laps = {}
    this.index = 0
    this.microtime = microtime
  }

  start(name = null) {
    if (name === null) name = ++this.index
    if (this.times[name] && this.times[name].start) return this.lap(name)
    this.times[name] = {}
    this.times[name].start = microtime.now()
    return this
  }

  lap(name) {
    if (!this.times[name]) return this.start(name)
    if (name === null) name = this.index

    if (this.laps[name]) {
      const prevEnd = this.laps[name].slice(0).pop().end
      const end = microtime.now()
      const diff = end - prevEnd
      this.laps[name].push({diff, end})
      return this
    }

    this.laps[name] = []
    const end = microtime.now()
    const start = this.times[name] ? this.times[name].start : Infinity
    const diff = end - start
    this.laps[name].push({end, diff})
    return this
  }

  stop(name) {
    if (this.times[name] && this.times[name].end) return this.lap(name)

    if (!this.times[name]) {
      console.log('had no times for ' + name)
      return this
    }
    this.times[name].end = microtime.now()
    this.times[name].diff = this.times[name].end - this.times[name].start
    return this
  }

  /**
   * returns the diff in microseconds for a timer or a lap
   * @param {string} name
   * @param {boolean} [laps]
   * @return {number} microseconds
   */
  took(name, laps = false) {
    if (laps) {
      return this
        .laps[name]
        .map(lap => lap.diff)
        .reduce(((a, b) => a + b), 0) +
        this.times[name].diff || 0
    }
    return this.times[name].diff
  }

  msTook(name, laps = false) {
    return this.took(name, laps) / 1000
  }

  parsedTook(name, laps = false) {
    const parse = require('./parse')
    const micro = this.took(name, laps)
    const parsed = parse(micro)
    return (parsed.toString())
  }

  parseMicro(micro) {
    const parse = require('./parse')
    const parsed = parse(micro)
    return (parsed.toString())
  }

  logLaps(name = null) {
    if (name === null) name = this.index

    const msg = this
      .laps[name]
      .map(lap => lap.diff)
      .reduce(((a, b) => a + b), 0) +
      this.times[name].diff || 0

    // console.log(this.times[name], this.laps[name])
    const level = '⏲  laps ' + name + ' took: '
    console.log(level + this.parseMicro(msg))
    return this
  }

  log(name) {
    const msg = this.parseMicro(this.times[name].diff) + 'ms'
    const level = '⏲  ' + name + ' took: '
    console.log(level + msg)
    return this
  }
}

module.exports = new Timer()
