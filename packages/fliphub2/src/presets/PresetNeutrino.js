const log = require('fliplog')
const kebabcase = require('lodash.kebabcase')
const requirePreset = require('../hubs/Bundlers/utils/requirePreset')

module.exports = class PresetNeutrino {
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  // @TODO: IMPROVE!!!
  // this would also need to check if it has already been added...
  // init(config, context)
  decorate(context, workflow) {
    const presets = context.presets
    const used = presets.used.entries()
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
        .tags('neutrino,preset,require')
        .text(`using neutrino preset: ${key}`)
        .color('green.italic')
        .echo()

      // const neutrinoPreset = requirePreset(kebabcase(key)).pop()
      const neutrinoPreset = [require(kebabcase(key))].pop()
      context
      .presets
      .add(key, {
        toWebpack: (neutrino) => neutrinoPreset(neutrino),
      })
    })

    // if (presets.hasUsed('neutrino-preset-node')) {
    //   const neutrinoPresetNode = requirePreset('neutrino-preset-node')[0]
    //   const presetNode = {
    //     toWebpack: (neutrino) => neutrinoPresetNode(neutrino),
    //   }
    //
    //   context
    //   .presets
    //   .add('neutrino-preset-node', presetNode)
    // }
    // if (presets.hasUsed('neutrino-preset-happypack')) {
    // let presetHappyPack = requirePreset('flip-neutrino-preset-happypack')[0]
    // const flipPreset = {toWebpack: neutrino => presetHappyPack(neutrino)}
    //
    // context
    // .presets
    // .add('neutrino-preset-happypack', flipPreset)
    // .use('neutrino-preset-happypack', null)
    // }
  }
}
