// @TODO: use real commander
var path = require('path')
global._dirname = __dirname
global.compile = true
// global.exec = true
// global.run = true
// console.log(__dirname)
// process.env.argv.push('bin/webpack')
// process.env.NODE_ENV = 'production'

// @NOTE: should have the commander be doing this dynamically
//
// var output = require('./configs/basic/mediator')
// require('./configs/basic/mediator')
// require('./configs/basic-build/mediator')
// require('./configs/intermediate/mediator')
require('./configs/verbose/mediator')
//
// require('./configs/node/mediator')
//
// require('./configs/intermediate-tests/mediator')
// require('./configs/fusebox/mediator')
// require('./configs/fuse-canadas/mediator')
