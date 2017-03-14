class Timer {
  constructor() {
    this.times = {}
  }
  start(name) {
    this.times[name] = {}
    this.times[name].start = Date.now()
    return this
  }
  stop(name) {
    this.times[name].end = Date.now()
    this.times[name].diff = this.times[name].end - this.times[name].start
    return this
  }
  log(name) {
    const msg = this.times[name].diff + 'ms'
    const level = '⏲  ' + name + ' took:'
    console._log(msg, {level})
    return this
  }
}

global._timer = new Timer()
// module.exports = new Timer()
