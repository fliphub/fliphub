const PresetLibrary = require('./PresetLibrary')
const PresetTarget = require('./PresetTarget')
const PresetProgress = require('./PresetProgress')

module.exports = class PresetDefaultsRollup {
  setArgs(args) {
    if (args) this.args = args
    return this
  }
  // this would also need to check if it has already been added...
  decorate(context, {config}) {
    context
    .presets
    .addAll({
      'presetTarget': new PresetTarget,
      'presetLibrary': new PresetLibrary,
      'presetProgress': new PresetProgress,
    })
    .useAll({
      'presetTarget': null,
      'presetLibrary': null,
      'presetProgress': null,
    })
  }
}
