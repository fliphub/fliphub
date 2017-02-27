#! /usr/bin/env node --harmony
global._rootdir = __dirname
global._dirname = __dirname

const program = require('./src/core/flip')
program.parse(process.argv)
