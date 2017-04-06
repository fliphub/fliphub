const {exists, read} = require('flipfile')
const log = require('fliplog')

// @TODO: require inferno or react or vue or whatever aliases here...
module.exports = class PresetWeb {
  constructor() {
    this.index = 1
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  // preInit(workflow)
  decorate(context, bundler, workflow) {
    const {to} = context.config.getFlips()

    // if it is an array, require the aliases and use if they exist
    if (Array.isArray(this.args)) {
      const aliases = require('./aliases')
      const alias = {}
      this.args.forEach(arg => {
        if (aliases[arg]) Object.assign(alias, aliases[arg])
        // context.presets.tapArgs('aliasRequire', this.args)
      })
      bundler.config.merge({alias})
    }

    // do not add preset neutrino unless it is webpack
    if (to !== 'webpack') return

    context
    .presets
    .use('neutrinoPresetReact', {})
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
