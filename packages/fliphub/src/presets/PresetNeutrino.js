const log = require('fliplog')
const kebabcase = require('lodash.kebabcase')
const requirePreset = require('../hubs/Bundlers/utils/requirePreset')

module.exports = class PresetNeutrino {
  constructor() {
    this.required = []
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  // @TODO: IMPROVE!!!
  // this would also need to check if it has already been added...
  // init(config, context)
  postDecorate(context) {
    const presets = context.presets
    const used = presets.used.entries()
    used['neutrino-preset-react'] = {}
    if (!used) return

    const neutrinos = []
    Object
    .keys(used)
    .filter((key) =>
      key.includes('neutrino') &&
      key !== 'neutrino' &&
      !key.includes('happypack'))
    .forEach((key) => {
      log
        // .tags('neutrino,preset,require')
        .text(`neutrino: using preset: ${key}`)
        .color('green.italic')
        .echo()

      // for debugging
      this.required.push(key)

      // const neutrinoPreset = requirePreset(kebabcase(key)).pop()
      const neutrinoPreset = [require(kebabcase(key))].pop()
      context
      .presets
      .add(key, {
        toWebpack: (config, workflow) => {
          const neutrino = workflow.current.bundler.api
          log
            // .data(neutrinoPreset)
            // .tosource()
            .text('neutrino')
            .echo()
            .text('========')
            .color('bold')
            .echo()

          // log.quick(neutrino)
          // setTimeout(() => log.quick(neutrino), 1)
          neutrinoPreset(neutrino, neutrino.options)
          // neutrino.requires(kebabcase(key))
        },
      })
    })

    // log.quick(context)
  }
}
