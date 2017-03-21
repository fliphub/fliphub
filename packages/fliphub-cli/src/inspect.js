const inspector = (msg) => {
  const util = require('util')
  msg = util.inspect(msg, {
    showHidden: true,
    depth: 10,
    showProxy: true,
    maxArrayLength: 100,
    colors: true,
  })
  return msg
}

module.exports = inspector
