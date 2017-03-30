const log = require('fliplog')

module.exports = class PresetDefaultsRollup {
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  decorate(context, bundler, workflow) {
    const {to} = context.config.getFlips()
    if (to !== 'rollup') return

    context.bundler.config.outputToString()
    let entry = context.bundler.config.get('entry')
    let output = context.bundler.config.get('output')

    // remove fusebox and webpack instructions
    entry = entry
      .replace(/\[/gmi, '')
      .replace(/\]/gmi, '')
      .replace(/>/gmi, '')
    output = output
      .replace(/\[/gmi, '')
      .replace(/\]/gmi, '')
      .replace(/>/gmi, '')

    context.bundler.config.merge({entry, output})

    // @NOTE: tsk tsk
    context.bundler.config.delete('target')
    workflow.current.bundler.api.config.delete('target')
    // context.workflow.log.quick(context.bundler.config)

    context
    .presets
    .useAll({
      target: null,
      library: null,
      progress: null,
    })
  }

  toRollup(config) {
    // const json = require('rollup-plugin-json')

    // json({
    //   // All JSON files will be parsed by default,
    //   // but you can also specifically include/exclude files
    //   include: '**',  // Default: undefined
    //   // exclude: ['node_modules/foo/**', 'node_modules/bar/**'],  // Default: undefined
    // }),

    // log.quick(config)
  }
}
