var walk = require('../file/walk')
var output = require('./output')
var inject = require('./inject')
var es5exports = require('./es5exports')
var injectLoaders = inject.injectLoaders
var injectPlugins = inject.injectPlugins
var tosource = require('tosource')
var path = require('path')
var fs = require('fs')

module.exports = {
  fs,
  path,
  tosource,
  walk,
  es5exports,
  injectPlugins,
  injectLoaders,
  getOutputPath: output,
}
