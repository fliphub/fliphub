const fs = require('fs')

// http://stackabuse.com/read-files-with-node-js/
function read(dir, helpers) {
  try {
    // if (!dir) warn
    // isAbsolute(dir)
    // var resolved = helpers.resolve(dir)
  } catch (e) {

  }
  return fs.readFileSync(dir, 'utf8')
}

module.exports = read
