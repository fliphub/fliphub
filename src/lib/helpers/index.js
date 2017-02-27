const walk = require('../file/walk')
const output = require('./output')
const inject = require('./inject')
const es5exports = require('./es5exports')
const injectLoaders = inject.injectLoaders
const injectPlugins = inject.injectPlugins
const tosource = require('tosource')
const path = require('path')
const fs = require('fs')
const arithmetics = require('./arithmetics')
const strIncludesAnyOf = require('./str')

let exportee = {
  fs,
  path,
  tosource,
  walk,
  es5exports,
  injectPlugins,
  injectLoaders,
  getOutputPath: output,
  strIncludesAnyOf,
}
exportee = Object.assign(exportee, arithmetics)

module.exports = exportee
