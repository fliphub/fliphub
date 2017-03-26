'use strict';

const resolve = require('fliphub-resolve');
const log = require('fliplog');

module.exports = class PresetResolveAll {
  constructor() {
    this.args = [];
  }

  toWebpack(config) {
    // make it an object, resolve it, return to merge it back in
    const resolved = resolve.obj(config.toConfig());
    return resolved;
  }
};