// @TODO: use real commander
// var path = require('path')
global._dirname = __dirname

// const e = require('./dist/empty')
// console.log(e)

// @TODO:
// here we could register our different configs, and filter configs!
// like presets of apps
const {cli} = require('./flipbox')
cli.flip('flipbox-config-es6', __dirname)

console.log(cli, __dirname)
// cli.flipHandler(require('./flip-z.js'))



// require('./configs/z/entry.js')

// require('./configs/minimal')

// global.compile = true
// global.exec = true
// global.run = true
// console.log(__dirname)
// process.env.argv.push('bin/webpack')
// process.env.NODE_ENV = 'production'

// @NOTE: should have the commander be doing this dynamically
// var output = require('./configs/basic/mediator')

// require('./configs/basic/mediator')
// require('./configs/basic-build/mediator')
// require('./configs/intermediate/mediator')

// require('./configs/verbose/mediator')
// require('./configs/node/mediator')

// require('./configs/intermediate-tests/mediator')
// require('./configs/fusebox/mediator')

// require('./configs/fuse-canadas/mediator')
// require('./configs/compat/mediator')
