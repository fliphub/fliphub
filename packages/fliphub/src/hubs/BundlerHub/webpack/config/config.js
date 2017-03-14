// @TODO:
// http://stackoverflow.com/questions/32874025/how-to-add-wildcard-mapping-in-entry-of-webpack
// wildcard entrypoint
//
// @TODO: async node target
// https://github.com/webpack/docs/issues/45
// https://github.com/knpwrs/webpack-to-memory
// https://github.com/shama/webpack-stream
//
// @TODO:
// http://stackoverflow.com/questions/32874025/how-to-add-wildcard-mapping-in-entry-of-webpack
// wildcard entrypoint

// @TODO: use adapters here to build up the config again
const WebPackConfig = {
  // libraryTarget() {
  //   if (target === 'node' && !libraryTarget)
  //   output.libraryTarget = 'commonjs2'
  // },

  loaders({config, builder}) {

  },

  // test: app => app.webpack,
  parse(args) {
    const {context, builder, api, app} = args
    let {config} = builder
    const {sourcemaps, target, params} = builder
    const {bundles} = context
    const bundle = bundles.getBundle()
    const {pm} = bundle

    // const params = config
    config.target = app.target || target

    const sm = sourcemaps.interpret({context})
    if (sm.use) {
      config.devtool = sm.tool
      config.sourceMapFilename = sm.file
    }

    if (!config.entry) config.entry = bundle.entry() || bundles.asFull().in

    // @TODO: when bundle fully supports all external formats
    // @SEE: webpack/adapters/external
    // if (!config.externals) config.externals = bundle.externals()
    if (!config.externals)
      config.externals = app.externals || bundles.excludeObj()
    if (!config.output) config.output = {
      filename: bundle.outFileName() || bundles.asFull().out.filename,
      path: bundle.outDir() || bundles.asFull().out.path,
    }

    // console._verbose(context)

    const alias = context.builder.aliases
    if (alias.use()) {
      const aliases = alias.get()
      if (!config.resolve) config.resolve = {}
      if (!config.resolve.alias) config.resolve.alias = aliases
      else config.resolve.alias = Object.assign(config.resolve.alias, aliases)
    }

    if (!config.module) config.module = {}
    // if (!config.module.rules) config.module.rules = {}
    if (!config.module.loaders) config.module.loaders = builder.loaders.get()
    if (!config.plugins) config.plugins = builder.plugins.get()

    // @TODO: map to app
    config.performance = {
      hints: 'warning',
    }
    // console._verbose(config)

    if (params && params.mergeable === false) {
      delete params.mergeable
      config = params
    }
    else if (params && params.mergeable !== false) {
      const _mergeWith = require('lodash.mergewith')
      function customizer(objValue, srcValue) {
        if (Array.isArray(objValue)) return objValue.concat(srcValue)
      }
      config = _mergeWith(config, params, customizer)
    }

    // @DEFAULTS?
    // module: {
    //   loaders,
    // },
    // resolve: {alias: {}},
    // plugins: [],
    console.verbose(args.box)
    console.verbose(config, {level: '🛠  webpack config', color: 'green'})
    // helpers.log(tosource(config),
    // {level: '🛠 builder_config_tosource', color: 'green'})
    // builder.apiConfig = config
    return config
  },
}

module.exports = WebPackConfig
