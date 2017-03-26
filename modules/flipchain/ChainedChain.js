const ChainedMapExtendable = require('./ChainedMapExtendable')

module.exports = class ChainedChain extends ChainedMapExtendable {
  mapChains(methodOrCallback) {
    const chainedConfigs = this.chains.map((name) => {
      const chain = this[name]
      if (chain.toConfig) return chain.toConfig()
      else throw new Error(`chain ${name} must implement toConfig`)
    })

    return this.clean(chainedConfigs)
  }
}
