global._rootdir = __dirname
global._dirname = __dirname

// process.env.argv.push('--run')
// process.env.argv.push('--devServer')
global.compile = true
// global.devServer = true
// global.run = true
// global.exec = true

// process.env.argv.push('--compile')
// process.env.argv.push('--exec')
require('./example/configs/flipbox/mediator')

// var flipbox = require('./dist/flipbox')
// console.log(flipbox)
