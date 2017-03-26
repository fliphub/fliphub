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

module.exports = class PresetDefaultsFuseBox {
  setArgs(args) {
    if (args) this.args = args
    return this
  }
  init() {
    const {HTMLPlugin, JSONPlugin} = require('fsbx')
    return {plugins: [HTMLPlugin({default: true}), JSONPlugin()]}
  }
}
