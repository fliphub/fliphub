// http://fredkschott.com/post/2014/06/require-and-the-module-system/
// const requirePath = require('../Bundlers/utils/requirePreset')
var Module = require('module')
var pathModule = require('path')
const missingModule = require('regexes/missing-module.js')
console.log(missingModule)
// process.exit(0)
module.constructor.prototype.require =
Module.constructor.prototype.require =
function(requested) {
  var self = this
  console.assert(typeof requested === 'string', 'path must be a string')
  console.assert(requested, 'missing path')

  try {
    return self.constructor._load(requested, self)
  } catch (err) {
    // if module not found, we have nothing to do, simply throw it back.
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log(err.message)
      const {execSync} = require('child_process')
      const matches = err.message.match(missingModule)
      const match = matches[1]
      execSync('npm install --save ' + match, {stdio: 'inherit'})
      console.log('caughtcha', match)
      delete require.cache[require.resolve(requested)]
      return require(requested)
      // throw err
    }

    // resolve the path to get absolute path
    requested = pathModule.resolve(__dirname, requested)

    // Write to log or whatever
    console.log('Error in file: ' + requested)
  }
}
