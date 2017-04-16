// https://www.npmjs.com/package/fast-glob benchmarks don't seem right...
const glob = require('glob')
const log = require('fliplog')
const globfs = require('flipfile/glob')
const fastGlob = require('fast-glob')
const timer = require('fliptime')

const pattern = 'output/**'

timer.start('globfs')
const globfsFiles = globfs().readdirSync(pattern)
timer.stop('globfs').log('globfs')

timer.start('node-glob')
const files = glob.sync(pattern, {absolute: true}) // stat: true,
timer.stop('node-glob').log('node-glob')

timer.start('fast-glob')
const fastFiles = fastGlob.sync(pattern, {stat: true})
timer.stop('fast-glob').log('fast-glob')

log.quick(files, globfsFiles, fastFiles)
