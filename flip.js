#! /usr/bin/env node --harmony
global._rootdir = __dirname
global._dirname = __dirname
global.flipRoot = __dirname

const FlipBox = require('./src')
global.$FlipBox = FlipBox
FlipBox.cli.commander.run()

// p.addPackage('flipbox', '0.0.1', '../')
// p.promptVersion('flipbox', '0.0.1')

module.exports = FlipBox
