// do like webpack, default to webpack
// https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L35
const {Hub} = require('fliphub-core')
const log = require('fliplog')
const clone = require('lodash.clonedeep')
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
   * @since 0.1.7
   * @description
   *   extract out flips into multiple apps,
   *   clone, insert, delete original
   *
   * @NOTE: might need to ensure we always pass an array of apps... use to-arr
   *
   * @event core.create
   * @param {Workflow} workflow
   */
  coreCreate(workflow) {
    // go through each app
    workflow.core.config.apps.forEach((app, i) => {
      // if it has an array of flips
      if (app.flips && Array.isArray(app.flips.to)) {
        // go through them
        app.flips.to.forEach(bundler => {
          // clone the apps, make a new name
          const cloned = clone(app)
          cloned.name = cloned.name + '-' + bundler
          // use only this bundler
          cloned.flips.to = bundler
          // add it
          workflow.core.config.apps.push(cloned)
        })
        // delete original since we cloned for each bundler
        // workflow.core.config.apps = workflow.core.config.apps.slice([i], 1)
        delete workflow.core.config.apps[i]
      }
    })

    workflow.core.config.apps = workflow.core.config.apps.filter(a => a)

    workflow.log
    .tags('extract,default,apps,bundlers,flips')
    .white('config extracted multiple apps')
    .data(workflow.core.config)
    .echo()
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
    const context = workflow.current
    const config = context.config
    const {name} = context
    const flips = config.get('flips')

    // default the input and output
    if (!config.get('output')) {
      config.set('output', {
        path: context.resolver('./dist/'),
        filename: name,
      })
    }
    if (!config.get('entry')) {
      config.set('entry', {
        [name]: context.resolver('./src/index.js'),
      })
    }
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
