var env = require('./env')
var html = require('./html')
var params = require('./params')
var loaders = require('./loaders')
var config = require('./config')
var plugins = require('./plugins')
var alias = require('./alias')
var defaults = require('./defaults')
var presets = require('./presets')
var flags = require('./flags')
var init = require('./init')
var test = require('./tests')
var externals = require('./externals')
var configOut = require('./out')
var tasks = require('./tasks')
var builders = require('./builders')
var builderInstance = require('./builderInstance')

var middleware = {
  builderInstance,

  configOut,
  externals,
  test,
  init,

  env,
  html,
  params,
  loaders,
  config,
  alias,

  defaults,
  presets,
  flags,
}

// flatten
middleware = Object.assign(middleware, plugins)
middleware = Object.assign(middleware, tasks)
middleware = Object.assign(middleware, builders)

module.exports = middleware
