const inspector = (msg) => {
  const util = require('util')
  try {
    const inspected = util.inspect(msg, {
      showHidden: true,
      depth: 30,
      showProxy: true,
      maxArrayLength: 100,
      colors: true,
    })
    return inspected
  } catch (e) {
    console.log(e)
    try {
      const stringify = require('javascript-stringify')
      const stringified = stringify(msg, null, '  ')
      return stringified
    } catch (e) {
      return msg
    }
  }
}

module.exports = inspector
