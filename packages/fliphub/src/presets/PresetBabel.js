const exists = require('flipfile/exists')
const read = require('flipfile/read')
const log = require('fliplog')
const deepmerge = require('deepmerge')

// https://github.com/rollup/rollup/issues/844
module.exports = class PresetBabel {
  constructor() {
    this.index = 1
    this.args = {}
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  getLoader(loader) {
    this.config = {
      test: /\.js?$/,
      loaders: ['babel-loader'],
      query: loader,
      // include: [resolve('./src/'), resolve('./package/'), resolve('./packages/')],
      exclude: [/node_modules/],
    }
    return this.config
  }

  getBabels() {
    const babels = require('./babels')
    let babelrc = {}

    // @TODO: support object for include/exclude etc
    if (Array.isArray(this.args)) {
      this.args.forEach(arg => {
        babelrc = deepmerge(babelrc, babels[arg] || {})
      })
    }

    return babelrc
  }

  // preInit(workflow)
  decorate(context, bundler, workflow) {
    const {to} = context.config.getFlips()

    if (to !== 'webpack') return

    const query = this.getBabels()
    const options = this.getLoader(query)
    // log.quick(query, loader)
    this.options = options
    // log.quick(bundler.config)

    // context
    //   .presets
    //   .use('neutrino-middleware-compile-loader', loader)
  }

  toWebpack(config, workflow) {
    const options = this.options

    const WebpackChain = require('flip-webpack-chain')
    const merge = new WebpackChain(config)
    merge
      .module
      .rule('compile')
      .test(options.test || /\.jsx?$/)
      .when(options.include, rule => rule.include.merge(options.include))
      .when(options.exclude, rule => rule.exclude.merge(options.exclude))
      .use('babel')
        .loader(require.resolve('babel-loader'))
        .options(options.babel || options.query || options.options)

    // log.quick(merge.toConfig())
    return merge.toConfig()
  }

  toRollup() {
    const babel = require('rollup-plugin-babel')
    return {
      pluginIndex: 95,
      plugins: [babel(this.args)],
    }
  }

  // @TODO: have to deal with using babili...
  toFuseBox(config, workflow) {
    const {BabelPlugin} = require('fuse-box')
    const babelrcPath = workflow.current.get('root') + '/.babelrc'
    let babelrc
    if (this.args) babelrc = this.args
    else if (exists(babelrcPath)) babelrc = {config: read.json(babelrcPath)}
    return {
      pluginIndex: -100,
      plugins: [BabelPlugin(babelrc)],
    }
  }
}
