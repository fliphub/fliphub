const exists = require('flipfile/exists')
const read = require('flipfile/read')
const log = require('fliplog')

// https://github.com/rollup/rollup/issues/844
module.exports = class PresetBabel {
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
    if (to !== 'webpack') return
    context
    .presets
    .use('neutrino-middleware-compile-loader', {})
  }

  toRollup() {
    const babel = require('rollup-plugin-babel')
    return {
      pluginIndex: 95,
      plugins: [babel()],
    }
  }

  // @TODO: have to deal with using babili...
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
