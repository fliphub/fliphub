// @TODO:
// - [ ] if last char is not already a `/`
// - [ ] deal with relative better
// - [ ] resolve better & deal with multiple entries
// - [ ] add lib for split `/` pop and join
const FuseBoxConfig = {
  // test: app => app.fusebox,
  parse({context, builder, bundle}) {
    const {params, sourcemaps} = builder

    let config = {
      debug: true,
      log: true,
      cache: context.settings.cache,
      homeDir: bundle.pm.homeDir(),
      outFile: bundle.pm.outFile(),
      package: context.name,
      globals: {[context.name]: '*'},
      plugins: builder.loaders.get(),
    }

    const sm = sourcemaps.interpret({context})
    if (sm.use) config.sourcemaps = sm.use
    // config.sourceMap = {
    //   bundleReference: sm.fileToMapLink,
    //   outFile: sm.file,
    // }

    // @NOTE: this allows replacing them
    if (params && params.mergeable === false) {
      delete params.mergeable
      config = params
    }
    else if (params) {
      // http://stackoverflow.com/questions/19965844/lodash-difference-between-extend-assign-and-merge
      const _mergeWith = require('lodash.mergewith')
      function customizer(objValue, srcValue) {
        if (Array.isArray(objValue)) return objValue.concat(srcValue)
      }
      config = _mergeWith(config, params, customizer)
    }

    // context.builder.config = config
    context.debugFor('fusebox', '💣  🛅  🏗 fusebox config ', 'white', inspector(config))
    builder.apiConfig = config
    return config
  },
}

module.exports = FuseBoxConfig
