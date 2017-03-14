function getDefaults() {
  var defaults = {
    settings: {
      cache: false,
    },

    debug: {
      pubsub: true,
      all: false,
      missingMiddleware: false,
      missingLoaders: true,
      devServer: true,
      middleware: true,
      loaders: false,
      verbose: false,
      built: false,
      decorated: false,
      time: true,
      filter: true,
      defaults: false,
      happypack: false,
      presets: false,
      out: false,
      order: false,
      params: false,
      alias: false,
      compile: false,
      exec: true,
      flags: false,
      testOutput: true,
      fuse: true,
      fuseAlias: true,
      translation: true,
    },
  
    // @TODO: enum flush it out
    // dev, devstatic/devprod, fusebox,
    // serverType: 'dev',
    //
    // useSourceMaps: true,
    // sourceMapTool: '#source-map',
    //
    // _noop: true,
    // clean: false, // bool, or array<string>
  }

  return defaults
}

module.exports = getDefaults
