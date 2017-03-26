// require('babel-core/register')
// require('babel/dist/external-helpers')
const core = require('fliphub-core')
let FlipHub = require('./core/FlipBox')

FlipHub.FlipHub = FlipHub
FlipHub = Object.assign(FlipHub, core)

// const cli = require('./hubs/CliHub')
// const paths = require('./paths')
// const es5exports = require('es5exports')
//
// exports.paths = paths
// exports.cli = cli
// exports.helpers = FlipBox.helpers
// exports.flags = FlipBox.flags
// exports['default'] = FlipBox
//
// module.exports = es5exports(exports['default'], exports)
module.exports = FlipHub
