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
    this.tillNow = this.tillNow.bind(this)
    this.tillNowSatisfies = this.tillNowSatisfies.bind(this)
  }

  parse(time) {
    const parse = require('./parse')
    const parsed = parse(time * 1000)
    return parsed
  }

  /**
   * @param  {number} time microseconds
   * @return {Object} {ms, s, m, h, d, y}
   */
  tillNow(time) {
    const now = Date.now()
    const then = time

    // @TODO just /, then / by diff
    const inSec = require('date-fns/difference_in_seconds')
    const inMin = require('date-fns/difference_in_minutes')
    const inHours = require('date-fns/difference_in_hours')
    const inDays = require('date-fns/difference_in_days')
    const inYears = require('date-fns/difference_in_years')

    return {
      ms: now - then,
      s: inSec(now, then),
      m: inMin(now, then),
      h: inHours(now, then),
      d: inDays(now, then),
      y: inYears(now, then),
    }
  }

  /**
   * check if a time diff matches a specificiation
   * @param  {number | Diff} time
   * @param  {Object} specificiation
   * @return {boolean}
   */
  tillNowSatisfies(time, specificiation) {
    // use object or string
    let till
    if (typeof time === 'object') till = time
    else till = this.tillNow(time)

    // get data with longhand usage
    let {hours, days, minutes, seconds, years} = specificiation

    // shorthand usage
    const {h, d, m, s, y} = specificiation
    if (h) hours = h
    if (d) days = d
    if (m) minutes = m
    if (s) seconds = s
    if (y) years = y

    // check diffs
    if (hours) return till.h >= hours
    if (days) return till.d >= days
    if (minutes) return till.m >= minutes
    if (seconds) return till.s >= seconds
    if (years) return till.s >= years

    return false
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
