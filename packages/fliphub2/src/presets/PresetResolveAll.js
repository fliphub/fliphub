const resolve = require('fliphub-resolve')
const log = require('fliplog')

module.exports = class PresetResolveAll {
  constructor() {
    this.args = []
  }

  toWebpack(bundler) {
    // make it an object, resolve it, return to merge it back in
    const toConfig = bundler.config.toConfig()
    const resolved = resolve.obj(toConfig)
    return resolved
  }
}
