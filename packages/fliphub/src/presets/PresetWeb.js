const {exists, read} = require('flipfile')
const log = require('fliplog')
const deepmerge = require('deepmerge')

// @TODO: require inferno or react or vue or whatever aliases here...
module.exports = class PresetWeb {
  constructor() {
    this.index = 1
    this.config = {}
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  // preInit(workflow)
  decorate(context, bundler, workflow) {
    const {to} = context.config.getFlips()
    const alias = {}

    // if it is an array,
    // require the aliases and
    // use if they exist
    if (Array.isArray(this.args)) {
      const aliases = require('./aliases')

      this.args.forEach(arg => {
        if (aliases[arg]) Object.assign(alias, aliases[arg])
        // context.presets.tapArgs('aliasRequire', this.args)
      })

      // to load babel env
      this.args.push('envWeb')
    }

    const resolve = bundler.config.get('resolve')
    const configAliases = bundler.config.get('alias')


    // do not add preset neutrino unless it is webpack
    // merge in alias instead of resolve.alias
    if (to !== 'webpack') {
      return bundler.config.merge({
        alias: deepmerge(configAliases || {}, alias),
      })
    }

    // only for webpack
    // merge in with existing aliases
    // this should be handled by Bundler config...
    if (resolve) {
      bundler.config.merge({
        resolve: {
          alias: deepmerge(resolve.alias, alias),
        },
      })
    }
    else {
      bundler.config.merge({
        resolve: {alias},
      })
    }


    // context
    //   .presets
    //   .use('neutrinoPresetReact', {})

    // if there is a config, use it
    if (Array.isArray(this.args)) {
      context
        .presets
        .use('babel', this.args)

      context
        .presets
        .getConfigured('babel')
        .decorate(context, bundler, workflow)
    }
  }
  toRollup() {
    const babel = require('rollup-plugin-babel')
    return {
      pluginIndex: 95,
      plugins: [babel()],
    }
  }
  toFuseBox(config, workflow) {
    const {BabelPlugin} = require('fuse-box')
    const babelrcPath = workflow.current.get('root') + '/.babelrc'
    let babelrc
    if (exists(babelrcPath)) babelrc = {config: read.json(babelrcPath)}
    return {
      pluginIndex: -100,
      plugins: [BabelPlugin(babelrc)],
    }
  }
}
