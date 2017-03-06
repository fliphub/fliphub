module.exports = function(configPath) {
  // hacky way to require `flip.js` if they just pass in dir
  try {
    const resolved = require('path').resolve(global._rootdir, configPath)
    require(resolved)
  } catch (e) {
    const resolved = require('path').resolve(global._rootdir, configPath + '/flip.js')
    require(resolved)
  }
}
