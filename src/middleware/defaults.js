module.exports = function(app, helpers) {
  var defaults = {
    debug: {
      missingMiddleware: false,
      missingLoaders: true,
      devServer: true,
      middleware: true,
      loaders: false,
      verbose: false,
      built: false,
      decorated: true,
      time: true,
      filter: true,
      defaults: false,
      happypack: false,
      presets: false,
      out: true,
      order: false,
      params: false,
      alias: true,
      fuse: true,
      exec: true,
      flags: true,
      testOutput: true,
    },
    fusebox: false,
    fuseboxAlias: false,

    useSourceMaps: true,
    sourceMapTool: '#source-map',

    // happypack: false,
    happypack: {
      cache: false,
      threads: 4,

      // this will make it load everything in node_modules if it is root...
      // - issue was it was not setting builders as external
      include: ['___________'],
    },
    loaders: {
      'babel': {},
      'json': {},
    },
    flags: {
      names: [
        {flag: 'compile'},
        {flag: 'exec'},
        {flag: 'run'},
        {flag: 'test'},
      ],
      cb: ({compile, exec, run, test}) => {
        var decorated = {compile, exec, run, test}
        if (test) {
          if (decorated.presets) {
            decorated.presets.push('test')
            decorated.presets.push('mocha')
          }
          else decorated.presets = ['test', 'mocha']
        }
        // helpers.log.verbose(decorated)
        return decorated
      },
    },
    env: {
      production: {
        uglify: true,
        defineProduction: true,
        run: false,
        compile: true,
        useSourceMaps: false,
        sourceMapTool: 'hidden',
      },
      development: {
        noEmitErrors: true,
      },
    },
    _noop: true,
    clean: false, // bool, or array<string>
  }

  if (helpers.defaults) {
    defaults = Object.assign(defaults, helpers.defaults)
  }

  // @TODO: needs safety
  // var merged = Object.assign(defaults, app)
  // var _merge = require('lodash').merge
  var _merge = require('lodash.merge')
  var merged = _merge(defaults, app)

  // can use .builder property
  // which contains an object to be merged
  // to the main config for that app
  if (app.builder) {
    merged = Object.assign(merged, app.builder)
    delete merged.builder
  }

  // // @TODO: improve
  if (app._config || app.config) {
    // merged.loaders = []
    // delete defaults.loaders
    // delete defaults.happypack
    // defaults.happypack = false
  }

  // @TODO: improve
  // if (app.entry) {
  if (app.happypack === false) {
    delete merged.happypack
    merged.happypack = false
  }

  if (merged.happypack && merged.happypack.include) {
    merged.happypack.include = merged.happypack.include.map(helpers.resolve)
  }

  // if there is aliases and fusebox without fuseboxAliases
  // then use babelAlias
  //
  // @TODO: and loaders includes babel
  if (merged.fusebox && !merged.fuseboxAlias && app.alias && app.loaders) {
    app.babelAlias = true
    // app.babelWebpackAlias = true
  }


  if (merged.debug.defaults) {
    helpers.log(merged, '🍦  defaults:')
  }

  return merged
}
