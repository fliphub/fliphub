// do like webpack, default to webpack
// https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L35
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')
const is = require('izz')

// @TODO: here, we will `.use` the default presets as needed
class ConfigDefaulter extends ChainedMapExtendable {
  static defaultPresets(presets) {
    // default the built in presets
    const {
      DefaultsEnv,
      PresetNeutrino,
      PresetDefaultsRollup,
      PresetMinify,
      PresetUglify,
      PresetLibrary,
      PresetTarget,
      PresetProgress,
      PresetSourceMap,
      PresetDefineEnv,
      PresetVisualize,
      PresetReplace,
      PresetBabel,
      PresetTypeScript,
    } = require('../../presets')

    return presets
      .add('replace', new PresetReplace)
      .add('visualize', new PresetVisualize)
      .add('library', new PresetLibrary)
      .add('target', new PresetTarget)
      .add('progress', new PresetProgress)
      .add('define-env', new PresetDefineEnv)
      .add('source-map', new PresetSourceMap)
      .add('defaults-env', new DefaultsEnv)
      .add('neutrino', new PresetNeutrino)
      .add('defaults-rollup', new PresetDefaultsRollup)
      .add('babel', new PresetBabel)
      .add('typescript', new PresetTypeScript)

      // .add('uglify', new PresetUglify)
      // .add('babili', new PresetMinify)
      // @TODO: add aliasing
      // .add('minify', new PresetMinify)
  }

  defaults(use = true) { if (use === false) return }

  static init(parent) { return new ConfigDefaulter(parent) }
  decorate(context, bundler) {
    const flips = context.get('flips')

    // default to webpack
    if (!flips) context.flips({from: 'webpack', to: 'webpack'})

    // if not flipping `to` anything, to is the same as from
    if (flips.from && !flips.to)
      context.flips({from: flips.from, to: 'webpack'})
    if (!flips.from && flips.to)
      context.flips({from: 'webpack', to: flips.to})

    return this
  }
}

module.exports = ConfigDefaulter
