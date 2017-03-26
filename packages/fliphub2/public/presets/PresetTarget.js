'use strict';

// https:// github.com/rollup/rollup-plugin-multi-entry

module.exports = class PresetTarget {
  init() {
    this.target = 'node';
  }

  toRollup(bundler) {
    const nodeResolve = require('rollup-plugin-node-resolve');
    return {
      pluginIndex: 10,
      plugins: [nodeResolve({
        jsnext: true
      })]
    };
  }
};