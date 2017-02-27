global.require = require
const FlipBox = require('./core/AppsBuilder')

exports.helpers = FlipBox.helpers
exports.flags = FlipBox.flags
exports.isWebpackCli = FlipBox.isWebpackCli
exports.fuseCommander = FlipBox.fuseCommander
exports.arithmetics = FlipBox.helpers.arithmetics
exports['default'] = FlipBox

module.exports = FlipBox.helpers.es5exports(exports['default'], exports)
// module.exports = FlipBox
