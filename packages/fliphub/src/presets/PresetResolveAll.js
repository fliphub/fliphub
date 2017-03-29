const resolve = require('fliphub-resolve')
const log = require('fliplog')

module.exports = class PresetResolveAll {
  constructor() {
    this.args = false
  }
  setArgs(args) {
    if (args !== null && args !== undefined) this.args = args
  }

  toRollup(config) {
    let resolver = resolve
    if (this.args !== false) {
      resolver = resolve.scoped(this.args).setRoot(1)
    }

    // make it an object, resolve it, return to merge it back in
    let resolved = resolver(config.toConfig())
    // log.quick(resolved, resolver)

    return resolved
  }
  toWebpack(config) {
    let resolver = resolve
    if (this.args !== false) {
      resolver = resolve.scoped(this.args).setRoot(1)
    }

    const props = ['alias', 'output', 'entry']

    const test = (file) => {
      console.log(file)
      return false
    }

    // make it an object, resolve it, return to merge it back in
    let resolved = resolver.forKeys(config.toConfig(), props)
    // log.quick(resolved, resolver)

    return resolved
  }
}
