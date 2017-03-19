const PresetDefineEnv = require('./PresetDefineEnv')
const PresetSourceMap = require('./PresetSourceMap')
const PresetUglify = require('./PresetUglify')

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
      'defineEnv': new PresetDefineEnv,
      'sourceMap': new PresetSourceMap,
      'uglify': new PresetUglify,
    })
    .useAll({
      'defineEnv': null,
      'sourceMap': null,
      'uglify': null,
    })
  }
}
