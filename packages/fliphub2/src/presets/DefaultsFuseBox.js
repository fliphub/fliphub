// instructions = '>' + pm.in.homeToEntry + ''
// bundle.includeKeys().forEach(includes => instructions += ' +' + includes)
// bundle.excludeKeys().forEach(external => instructions += ' -' + external)
//
// let config = {
//   debug: true,
//   log: true,
//   cache: context.settings.cache,
//   homeDir: bundle.pm.homeDir(),
//   outFile: bundle.pm.outFile(),
//   package: context.name,
//   globals: {[context.name]: '*'},
//   plugins: builder.loaders.get(),
// }

const PresetLibrary = require('./PresetLibrary')
const PresetTarget = require('./PresetTarget')
const PresetProgress = require('./PresetProgress')

module.exports = class PresetDefaultsFuseBox {
  setArgs(args) {
    if (args) this.args = args
    return this
  }
  // this would also need to check if it has already been added...
  decorate(context, {config}) {
    // config.plugins = config.plugins ? config.plugins : []

    // @TODO: html, json, default?

    // context
    // .presets
    // .addAll({
    //   'presetTarget': new PresetTarget,
    //   'presetLibrary': new PresetLibrary,
    //   'presetProgress': new PresetProgress,
    // })
    // .useAll({
    //   'presetTarget': null,
    //   'presetLibrary': null,
    //   'presetProgress': null,
    // })
  }
}
