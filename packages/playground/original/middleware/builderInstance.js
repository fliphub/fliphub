module.exports = function(app, helpers) {
  function BuilderInstancePlugin(options) {
    BuilderInstancePlugin.selector = options.selector
  }
  BuilderInstancePlugin.prototype.apply = function(compiler) {}
  return helpers.injectPlugins(app, new BuilderInstancePlugin(helpers.builder))
}
