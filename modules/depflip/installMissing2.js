// http://fredkschott.com/post/2014/06/require-and-the-module-system/
// const requirePath = require('../Bundlers/utils/requirePreset')
var Module = require('module')
var {resolve} = require('path')
var missingModule = require('regexes/missing-module.js')
const clearRequire = require('./clear-require').all
const {execSync} = require('child_process')
const isRel = require('flipfile/isRel')

// process.exit(0)
module.constructor.prototype.require =
Module.constructor.prototype.require =
function(requested) {
  var self = this
  console.log({requested})
  if (typeof requested !== 'string') {
    console.log('path must be a string')
    return null
  }
  console.assert(typeof requested === 'string', 'path must be a string')
  console.assert(requested, 'missing path')

  if (isRel(requested)) return self.constructor._load(requested, self)

  execSync('npm install --save ' + requested, {stdio: 'inherit'})
  console.log('caughtcha', requested)
  try {
    delete require.cache[require.resolve(requested)]
  } catch (e) {
    const requirePath = resolve(process.cwd(), './node_modules/' + requested)
    console.log({requirePath})
    delete require.cache[requirePath]
    // log.quick(require.cache)
    console.log({e})
  }

  clearRequire()
  return self.constructor._load(requested, self)
}
