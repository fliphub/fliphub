// do like webpack, default to webpack
// https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L35
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')
const is = require('izz')
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
  PresetFlags,

  PresetAliasResolve,
  PresetAliasRequire,
  PresetResolveAll,
  PresetEslint,
} = require('../../presets')

// @TODO: here, we will `.use` the default presets as needed
class ConfigDefaulter extends ChainedMapExtendable {
  static init(parent) {
    return new ConfigDefaulter(parent)
  }

  static defaultPresets(presets) {
    // default the built in presets
    return presets
      .add('replace', new PresetReplace())
      .add('visualize', new PresetVisualize())
      .add('library', new PresetLibrary())
      .add('target', new PresetTarget())
      .add('progress', new PresetProgress())
      .add('define-env', new PresetDefineEnv())
      .add('source-map', new PresetSourceMap())
      .add('defaults-env', new DefaultsEnv())
      .add('neutrino', new PresetNeutrino())
      .add('defaults-rollup', new PresetDefaultsRollup())
      .add('babel', new PresetBabel())
      .add('typescript', new PresetTypeScript())
      .add('flags', new PresetFlags())
      .add('alias-require', new PresetAliasRequire())
      .add('alias-resolve', new PresetAliasResolve())
      .add('resolve-all', new PresetResolveAll())
      .add('eslint', new PresetEslint())


      // .add('alias-loader': new PresetAliasRequire)
      // .add('uglify', new PresetUglify)
      // .add('babili', new PresetMinify)
      // @TODO: add aliasing
      // .add('minify', new PresetMinify)
  }

  decorate(context, bundler) {
    const flips = context.get('flips')

    // default to webpack
    if (!flips) context.flips({from: 'webpack', to: 'webpack'})

    // if not flipping `to` anything, to is the same as from
    else if (flips.from && !flips.to)
      context.flips({from: flips.from, to: 'webpack'})
    else if (!flips.from && flips.to)
      context.flips({from: 'webpack', to: flips.to})

    return this
  }
}

module.exports = ConfigDefaulter
