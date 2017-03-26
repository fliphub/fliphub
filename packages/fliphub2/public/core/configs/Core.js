'use strict';

const { Presets, ChainedMap } = require('fliphub-core');
const log = require('fliplog');
const is = require('izz');

module.exports = class CoreConfig extends ChainedMap {

  /**
   * @param {Workflow} parent
   */
  constructor(parent) {
    super(parent);
    this.extend(['inherit', 'from', 'to', 'defaults', 'presetArgs']);
  }

  /**
   * whether all apps should inherit by default
   * flipping from-to
   * @param {Object} config
   * @return {CoreConfig}
   */
  merge(config) {
    let { presets, inherit, from, to, defaults, presetArgs } = config;
    const merge = { inherit, from, to, defaults, presetArgs };
    Object.keys(merge).filter(key => is.real(merge[key])).forEach(key => {
      const val = merge[key];
      switch (key) {
        default:
          {
            // log.tags('merge,flip,config').data({key, val}).echo()
            return this[key](val);
          }
      }
    });

    if (!presets) return this;
    Presets.mergeFor({ presets, presetArgs, context: this });
    return this;
  }
};