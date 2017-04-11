const log = require('fliplog')
const {orderByKeys, flipcache, flipscript, toarr} = require('./deps')

const scripts = flipscript

/**
 * @TODO:
 * - [ ] should be configurable
 *       if they want presets to be saved to pkgjson
 *       or to a file that is not gitignored
 *
 * add
 *   makes a config file for presets
 * load
 *   loads an existing presets from the config file
 *   executes it in a subprocess
 *   it should (be able to) reset argv, then re-run program
 */
class Presets {
  use() {
    const preset = flipcache.file(name).json().load().read()
    const presets = preset.presets

    const scopes = preset.packages

    // would take env out of the args of each...?
    const multipliers = ''

    // @TODO:
    // should be able to use merge with chain
    //
    // should be able to run programs without a double subprogram
    // just edit flags, require program without cache
    //
    Object.keys(presets).forEach(cmd => multipliers.forEach(env => {
      const script = scripts
        .add()
        .node()
        .raw('flip.js')
        .raw(cmd)
        .raw(scopes)
        // .env(env)

      presets[cmd].map.forEach(flag => script.flag(flag))
    }))

    log.quick(scripts)
  }

  /**
   * @param  {string | Array<string>} val
   * @param  {string} prop
   * @return {Object}
   */
  getKeyFlag(val, prop) {
    if (typeof val === 'string') return {key: prop, flag: val}
    const split = val.split('.')
    const key = split.shift()
    const flag = split.pop()
    return {split, key, flag}
  }

  /**
   * @TODO:
   * - [ ] need to add some decorator/transformer that changes it when saving...
   *
   * @param {Object} preset
   * @param {Array<string>} order
   */
  add(preset, order) {
    let presets = {}

    Object
      .keys(preset)
      .forEach(prop => {
        toarr(preset[prop])
        .forEach(val => {
          const {key, flag} = this.getKeyFlag(val, prop)
          if (!presets[key]) presets[key] = []
          presets[key].push(flag)
        })
      })

    presets = orderByKeys(presets, order)
  }
}

module.exports = Presets
