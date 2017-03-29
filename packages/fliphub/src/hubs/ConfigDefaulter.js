// do like webpack, default to webpack
// https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L35
const {Hub} = require('fliphub-core')
const log = require('fliplog')
const is = require('izz')
const {
  PresetDefaultsFuseBox,
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
  PresetWeb,
} = require('../presets')

// @TODO:
// - [x] here, we will `.use` the default presets as needed
// - [ ] here, we will `.use` defaults per context depending on config !!!
module.exports = class ConfigDefaulter extends Hub {
  static init(workflow) {
    return new ConfigDefaulter(workflow)
  }

  static defaultPresets(presets, workflow) {
    // default the built in presets
    return presets
      .add('replace', new PresetReplace(workflow))
      .add('visualize', new PresetVisualize(workflow))
      .add('library', new PresetLibrary(workflow))
      .add('target', new PresetTarget(workflow))
      .add('progress', new PresetProgress(workflow))
      .add('define-env', new PresetDefineEnv(workflow))
      .add('source-map', new PresetSourceMap(workflow))
      .add('defaults-env', new DefaultsEnv(workflow))
      .add('neutrino', new PresetNeutrino(workflow))
      .add('rollup', new PresetDefaultsRollup(workflow))
      .add('babel', new PresetBabel(workflow))
      .add('web', new PresetWeb(workflow))
      .add('typescript', new PresetTypeScript(workflow))
      .add('flags', new PresetFlags(workflow))
      .add('alias-require', new PresetAliasRequire(workflow))
      .add('alias-resolve', new PresetAliasResolve(workflow))
      .add('resolve-all', new PresetResolveAll(workflow))
      .add('eslint', new PresetEslint(workflow))
      .add('fusebox', new PresetDefaultsFuseBox(workflow))

      // .add('alias-loader': new PresetAliasRequire)
      // .add('uglify', new PresetUglify)
      // .add('babili', new PresetMinify)
      // @TODO: add aliasing
      // .add('minify', new PresetMinify)
  }

  /**
   * @event core.init
   * @param {Workflow} workflow
   */
  coreInit(workflow) {
    ConfigDefaulter.defaultPresets(workflow.coreConfig.presets, workflow)
    if (workflow.coreConfig.get('defaults')) {
      const monorepo = workflow.coreConfig.get('monorepo')
      workflow.coreConfig.presets.useAll({
        aliasResolve: monorepo ? null : 1,
        resolveAll: monorepo ? null : 1,
        progress: null,
        fusebox: null,
        neutrino: null,
        rollup: null,
      })
    }
  }

  /**
   * @event context.init.pre
   * @param {Workflow} workflow
   */
  preInit(workflow) {
    const config = workflow.current.config
    const flips = config.get('flips')
  }

  /**
   * @event context.init
   * @param {Workflow} workflow
   */
  init(workflow) {
    const config = workflow.current.config
    const flips = config.get('flips')

    // default to webpack
    if (!flips) config.flips({from: 'webpack', to: 'webpack'})

    // if not flipping `to` anything, to is the same as from
    else if (flips.from && !flips.to)
      config.flips({from: flips.from, to: 'webpack'})
    else if (!flips.from && flips.to)
      config.flips({from: 'webpack', to: flips.to})
  }
}
