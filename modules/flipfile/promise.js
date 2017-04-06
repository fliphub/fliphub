let ex = {}

try {
  if (require.resolve('fs-promise')) {
    ex = require('fs-promise')
  }
} catch (e) {
  // ignore
}

module.exports = ex
