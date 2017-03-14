module.exports = function envDefaults() {
  let env = {
    production: {
      uglify: true,
      defineProduction: true,
      // define: {
      //   production: true,
      // },
      run: false,
      compile: true,

      // sourcemaps: false
      useSourceMaps: false,
      sourceMapTool: 'hidden',
    },
    development: {
      noEmitErrors: true,

      useSourceMaps: true,
      sourceMapTool: '#source-map',
    },

    // default
    'magic': {
      useSourceMaps: true,
      sourceMapTool: '#source-map',
    },
  }

  return env
}
