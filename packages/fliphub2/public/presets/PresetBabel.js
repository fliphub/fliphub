'use strict';

const exists = require('flipfile/exists');
const read = require('flipfile/read');

// https://github.com/rollup/rollup/issues/844
module.exports = class PresetBabel {
  init() {}
  setArgs(args) {
    if (args) this.args = args;
    return this;
  }

  toWebpack() {
    const compile = require('neutrino-middleware-compile-loader');
    return neutrino => neutrino.use(compile);
  }
  toRollup() {
    const babel = require('rollup-plugin-babel');
    return {
      pluginIndex: 95,
      plugins: [babel()]
    };
  }

  // @TODO: have to deal with using babili...
  toFuseBox(config) {
    const { BabelPlugin } = require('fsbx');
    // const {UglifyJSPlugin} = require('fuse-box')
    //
    const babelrcPath = config.context.root + '/.babelrc';
    let babelrc;
    if (exists(babelrcPath)) babelrc = { config: read.json(babelrcPath) };
    return {
      pluginIndex: -100,
      plugins: [BabelPlugin(babelrc)]
    };
  }
};