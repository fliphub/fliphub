'use strict';

const is = require('izz');
const log = require('fliplog');

class PresetSourceMap {
  init() {
    this.devtool = null;
    this.file = null;
  }

  // if !manual config,
  // default would set it
  // (which means having a hook to `add` presets...)
  //
  // this would take in preset arg
  setArgs(arg) {
    if (!arg) return;
    if (is.str(arg)) this.devtool = arg;else if (is.obj(arg)) {
      this.devtool = arg.devtool;
      this.file = arg.file;
    }
  }

  toRollup() {
    if (this.devtool === false) return { sourceMap: false };
    log.preset('info').addText('sourceMap is default enabled with rollup :-)').echo();
    return null;
  }
  toFuseBox() {
    if (this.devtool === false) return {};
    return { sourceMap: true };
  }
  toWebpack() {
    return { devtool: this.devtool || 'hidden' };
    // output: {sourceMapFile: ''}
  }
}

module.exports = PresetSourceMap;