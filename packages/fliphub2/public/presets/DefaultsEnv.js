'use strict';

const PresetUglify = require('./PresetUglify');
const PresetMinify = require('./PresetMinify');

module.exports = class PresetDefaultsEnv {
  setArgs(args) {
    if (args) this.args = args;
    return this;
  }
  decorate(context, workflow) {
    if (process.env.NODE_ENV === 'production') {
      context.presets.addAll({
        uglify: new PresetUglify(),
        babili: new PresetMinify(),
        minify: new PresetMinify()
      }).useAll({
        defineEnv: JSON.stringify('production'),
        sourceMap: 'hidden',
        babili: null
      });
    } else {
      context.presets.useAll({
        'sourceMap': '#sourcemap'
      });
    }
  }
};