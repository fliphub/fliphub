const PresetUglify = require('./PresetUglify')
const PresetMinify = require('./PresetMinify')

module.exports = class PresetDefaultsEnv {
  constructor() {
    this.args = {
      production: {
        uglify: null,
        minify: null,
        defineEnv: JSON.stringify('production'),
        sourceMap: 'hidden',
      },
      development: {
        sourceMap: '#sourcemap',
      },
    }
  }
  setArgs(args) {
    if (args) this.args = args
    return this
  }
  decorate(context, workflow) {
    const {production, development} = this.args

    if (process.env.NODE_ENV === 'production') {
      const {uglify, minify, defineEnv, sourceMap} = production

      context
      .presets
      .addAll({
        uglify: new PresetUglify(uglify),
        babili: new PresetMinify(minify),
        minify: new PresetMinify(minify),
      })
      .useAll({
        defineEnv,
        sourceMap,
        babili: minify,
        // 'babili: null,
        // 'minify: null,
        // 'uglify: null,
      })
    } else {
      const {sourceMap} = development
      
      context
      .presets
      .useAll({
        sourceMap,
      })
    }
  }
}
