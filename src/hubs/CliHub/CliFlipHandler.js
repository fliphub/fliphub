module.exports = function(flipHandler) {
  if (typeof flipHandler !== 'string') {
    return flipHandler
  }
  // hacky way to require `flip.js` if they just pass in dir
  try {
    const resolved = require('path').resolve(global._rootdir, flipHandler)
    require(resolved)
  } catch (e) {
    const resolved = require('path').resolve(global._rootdir, flipHandler + '/flip.js')
    require(resolved)
  }
}
