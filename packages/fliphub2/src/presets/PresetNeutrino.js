const requirePreset = require('../hubs/Bundlers/utils/requirePreset')
const log = require('fliplog')

module.exports = class PresetNeutrino {
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  // @TODO: IMPROVE!!!
  // this would also need to check if it has already been added...
  // init(config, context)
  decorate(context, {config}) {
    if (context.presets.used.has('neutrino-preset-node')) {
      let neutrinoPresetNode = requirePreset('neutrino-preset-node')[0]
      const presetNode = {
        toWebpack: (neutrino) => neutrinoPresetNode(neutrino),
      }

      context
      .presets
      .add('neutrino-preset-node', presetNode)
    }

    if (context.presets.used.has('neutrino-preset-happypack')) {
      let presetHappyPack = requirePreset('flip-neutrino-preset-happypack')[0]
      const flipPreset = {toWebpack: neutrino => presetHappyPack(neutrino)}

      context
      .presets
      .add('neutrino-preset-happypack', flipPreset)
      .use('neutrino-preset-happypack', null)
    }
  }
}
