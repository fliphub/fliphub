#! /usr/bin/env node --harmony
global._rootdir = __dirname
global._dirname = __dirname

const program = require('./src/hubs/CliHub/Commander')
program.parse(process.argv)
