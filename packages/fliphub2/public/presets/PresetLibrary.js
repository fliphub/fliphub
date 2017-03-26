'use strict';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// preset Library & Target could be the same
//
// but we could do MULTI-LIBRARY...
// FOR MULTIPLE BUILDS OF THE SAME
// WITH DIFFERENT LIBRARIES
// TOP NOTCH <<<<<<<<<<<<<<<<<<<<<<

const is = require('izz');
const Joi = require('joi');
const log = require('fliplog');

module.exports = class PresetLibrary {
  init() {
    this.options = {
      library: 'cjs'
    };

    this.schema = Joi.object().keys({
      include: Joi.array(),
      exclude: Joi.array(),
      extensions: Joi.array(),
      ignoreGlobal: Joi.boolean(),
      namedExports: Joi.object(),
      ignore: Joi.array()
    }).unknown(false);

    this.args = {
      include: 'node_modules/**'
    };
  }

  setArgs(arg) {
    if (!this.args) this.init();
    if (!is.real(arg)) return;
    if (is.obj(arg)) {
      // if (arg.options) this.options = Object.assign(this.options, arg.options)
      const valid = {};
      // console.log(this.schema)
      // const valid = Joi.validate(arg, this.schema)
      if (!valid.error) this.args = Object.assign(this.args, arg);
      // else console.log(valid.error)
    } else if (is.str(arg)) {
      this.options.library = arg;
    } else {
      throw new Error(`
        library preset must be a
        string | object with .library and .include`);
    }
  }

  toRollup() {
    const { library } = this.options;
    // log.text('usecommonjs').data(this).verbose().exit()
    if (library === 'cjs') {
      const commonjs = require('rollup-plugin-commonjs');
      return {
        pluginIndex: 20,
        plugins: [commonjs(this.args)]
      };
    }
    console.log('had no supported library', library);
    return {};
  }
};