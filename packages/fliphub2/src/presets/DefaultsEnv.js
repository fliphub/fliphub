const PresetUglify = require('./PresetUglify')
const PresetMinify = require('./PresetMinify')

module.exports = class PresetDefaultsEnv {
  setArgs(args) {
    if (args) this.args = args
    return this
  }
  // this would also need to check if it has already been added...
  decorate(context, config) {
    context
    .presets
    .addAll({
      'uglify': new PresetUglify,
      'babili': new PresetMinify,
      'minify': new PresetMinify,
    })
    .useAll({
      'defineEnv': null,
      'sourceMap': null,
      // 'babili': null,
      // 'minify': null,
      // 'uglify': null,
    })
  }
}
