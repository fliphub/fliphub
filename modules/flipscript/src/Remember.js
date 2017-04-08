/**
 * estimate duration, save duration, save on escape too
 */
const flipcache = require('flipcache')
const timer = require('fliptime')
const log = require('fliplog')

const cache = flipcache
  .to('.fliphub/flipcache.json')
  .json()
  .load()
  .setIfNotEmpty('remembers', {})

// is obj, so by ref
const remembers = cache.get('remembers')

/**
 * @since 0.0.6
 */
module.exports = class Remember {
  constructor(parent) {
    this.parent = parent
  }

  /**
   * @description update a progress bar with averages
   * @see fliplog.progress
   * @param  {string} str JSON.stringify(args)
   * @return {Remember}
   */
  progressBar(str) {
    if (!remembers[str]) return this

    const remember = remembers[str]
    const vals = remember.times
    const sum = vals
      .map(obj => obj.diff)
      .reduce((prev, curr) => prev + curr, 0)

    remember.avg = Math.floor(sum / vals.length)

    const ms = remember.avg / 120
    const interval = ms / 100
    let start = interval
    let contentLength = ms
    const bar = log.progress('running... [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: contentLength,
    }).progressBar

    function next() {
      if (!contentLength) return
      start += interval
      bar.tick(start)
      if (!bar.complete) setTimeout(next, interval)
    }
    next()

    return this
  }

  /**
   * @description hash the args, check if it exists, store result
   * @param  {Object} args
   * @param  {boolean} progress
   * @return {Remember}
   */
  start(args, progress) {
    const str = JSON.stringify(args)

    timer.start(str)

    if (progress) this.progressBar(str)

    return this
  }

  /**
   * @description hash the args, check if it exists, store result
   * @see FlipTime
   *
   * @param  {Object} args
   * @param  {Object} result
   * @return {Remember}
   */
  finish(args, result) {
    const str = JSON.stringify(args)

    timer.stop(str)

    const times = timer.times[str]
    let {start, end, diff} = times

    // not needed, extra data, but could be helpful data?
    // start = Math.floor(start / 1000)
    // end = Math.floor(end / 1000)

    // create if not exists
    // push result
    if (!remembers[str]) remembers[str] = {times: [], avg: 0}
    remembers[str].times.push({diff}) // start, end,
    cache.write()

    // log.quick(cache.clean())

    return this
  }
}
