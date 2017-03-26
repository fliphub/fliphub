const inspector = (msg, depth = 30) => {
  // allow taking in different depths
  if (!Number.isInteger(depth)) depth = 10
  const util = require('util')
  try {
    const inspected = util.inspect(msg, {
      depth,
      maxArrayLength: depth,
      showHidden: true,
      showProxy: true,
      colors: true,
    })
    return inspected
  } catch (e) {
    console.log(e)
    try {
      const stringify = require('javascript-stringify')
      const stringified = stringify(msg, null, '  ')
      return stringified
    } catch (error) {
      return msg
    }
  }
}

module.exports = inspector
