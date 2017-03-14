const inspector = (msg) => {
  const util = require('util')
  return util.inspect(msg, {
    showHidden: true,
    depth: 30,
    showProxy: true,
    maxArrayLength: 100,
    colors: true,
  })
}

module.exports = inspector
