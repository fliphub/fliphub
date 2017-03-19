// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// preset Library & Target could be the same
//
// but we could do MULTI-LIBRARY...
// FOR MULTIPLE BUILDS OF THE SAME
// WITH DIFFERENT FUCKING LIBRARIES
// TOP NOTCH <<<<<<<<<<<<<<<<<<<<<<

const is = require('izz')
module.exports = class PresetLibrary {
  init() {
    this.library = 'cjs'
  }

  setArgs(arg) {
    if (!is.real(arg)) return
    if (!is.str(arg)) throw new Error('library preset must be a string')
    this.library = arg
  }

  toRollup() {
    if (this.library === 'cjs') {
      const commonjs = require('rollup-plugin-commonjs')
      return {
        pluginIndex: 20,
        plugins: [
          commonjs({
            include: 'node_modules/**',
          }),
        ],
      }
    }
    console.log('had no supported library', this.library)
    return {}
  }
}
