global._rootdir = __dirname
global._dirname = __dirname

// process.env.argv.push('--run')
// process.env.argv.push('--devServer')
// global.devServer = true
// global.run = true
// global.exec = true

global.compile = true
global.fusebox = true

// process.env.argv.push('--compile')
// process.env.argv.push('--exec')

require('./example/configs/flipbox/mediator')

// @NOTE: emulate webpack
// process.argv.push('bin/webpack')
// var mediated = require('./example/configs/flipbox/mediator')
// console.log(mediated)

// var flipbox = require('./dist/flipbox')
// console.log(flipbox)
