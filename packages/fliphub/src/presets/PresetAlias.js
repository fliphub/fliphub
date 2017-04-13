const Aliaser = require('fliphub-alias')
const log = require('fliplog')

/**
 * @see PresetRequireAlias
 * @see PresetResolveAlias
 */
module.exports = class PresetAlias {
  constructor() {
    this.args = []
  }

  setArgs(args = []) {
    this.args = args
  }

  preDecorate(context) {
    const workflow = context.workflow
    const config = context.bundler.config

    context
      .presets
      .useAll({
        aliasRequire: {files: this.args.files, dir: this.args.dir},
        aliasResolve: null,
      })

    // log.quick(context.presets)
  }
}
