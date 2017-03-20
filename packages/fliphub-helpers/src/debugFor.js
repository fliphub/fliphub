const toArr = require('./arr/toArr')
const log = require('./log')

function debugFor(keys, msg, color, data) {
  keys = toArr(keys)

  if (this.whiteflags) {
    for (let i in this.whiteflags) {
      const key = this.whiteflags[i]
      if (keys.includes(key)) return log
      else if (keys === '*') return log
    }
  }
  return log.silent(true)
}

module.exports = {
  debugFor,
  debugForFlags: (whiteflags) => debugFor.bind({whiteflags}),
}
