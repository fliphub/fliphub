const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const deepmerge = require('deepmerge')
const log = require('fliplog')
const is = require('izz')
const insertArrAt = require('insert-at-index')

module.exports = class Config extends ChainedMapExtendable {

  /**
   * @return {Object} config for bundler
   */
  toConfig() {
    const config = this.entries()

    if (!config.plugins) config.plugins = []
    config.plugins = config.plugins.filter((real) => real)
    return config
  }

  merge(obj) {
    if (!obj) {
      return
    }
    const pluginIndex = obj.pluginIndex
    delete obj.pluginIndex

    Object
    .keys(obj)
    .forEach((key) => {
      const value = obj[key]
      switch (key) {
        case 'plugins': {
          let plugins = this.get('plugins') || []
          // log.verbose().data(plugins).text('plugins').echo()

          if (pluginIndex) {
            // log.verbose().data(pluginIndex).text('pluginIndex').echo()
            plugins = insertArrAt(plugins, pluginIndex, value)
          }
          else if (is.arr(value)) {
            // log.verbose().data(key).text('pluginConcat').echo()
            plugins = plugins.concat(value)
          }
          else {
            // log.verbose().data(key).text('PLUGINDEEPMERGE').echo()
            plugins = deepmerge(plugins, value)
          }

          return this.set('plugins', plugins)
        }
        case 'maybepluginsorsomethinglater': {
          return this[key].merge(value)
        }
        default: {
          return this.set(key, value)
        }
      }
    })
  }
}
