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
const log = require('fliplog')
const {Hub} = require('fliphub-core')

module.exports = class PresetDefaultsFuseBox extends Hub {
  // instructions
  setArgs(args) {
    if (args) this.args = args
    return this
  }
  init(workflow) {
    if (this.args)
      workflow.current.config.flips({from: 'webpack', to: 'fusebox'})
  }
  decorate(context) {
    const {to} = context.config.getFlips()
    if (to !== 'fusebox') return
  }
  toFuseBox(config, workflow) {
    const {HTMLPlugin, JSONPlugin} = require('fuse-box')

    workflow.current.bundler.config.outputToString()

    let entry = config.get('entry')
    let output = config.get('output')
    const root = config.get('root')


    if (this.args && typeof entry === 'string') {
      entry = this.args.replace('entry', entry)
      entry = entry.replace('./', '').replace(root, '')
    }

    // this.args &&
    if (typeof output === 'string') {
      output = output
        .replace('./', '')
        .replace(root, '')
        .replace('[name]', '$name')
    }

    // log.quick(this.args, instructions, root, workflow)
    // log.quick({entry, output})

    return {
      plugins: [HTMLPlugin({default: true}), JSONPlugin()],
      entry,
      output,
    }
  }
}
