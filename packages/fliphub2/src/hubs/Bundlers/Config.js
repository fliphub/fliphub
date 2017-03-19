const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const deepmerge = require('deepmerge')
const log = require('fliplog')
const is = require('izz')

function insertArrAt(array, index, arrayToInsert) {
  Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert))
  return array
}

module.exports = class Config extends ChainedMapExtendable {
  toConfig() {
    const config = this.entries()
    log.verbose().data(config).text('plugins').echo()
    // console.log(config, 'toconfig...')
    return config
  }

  merge(obj) {
    const pluginIndex = obj.pluginIndex
    delete obj.pluginIndex

    Object
    .keys(obj)
    .forEach(key => {
      const value = obj[key]
      switch (key) {
        case 'plugins': {
          let plugins = this.get('plugins') || []
          // log.verbose().data(plugins).text('plugins').echo()

          if (pluginIndex)
            plugins = insertArrAt(plugins, pluginIndex, value)
          else if (is.arr(value))
            plugins = plugins.concat(value)
          else
            plugins = deepmerge(plugins, value)

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

    // console.log(obj, this)
    // const eh = deepmerge(this, data)
    // console.log(eh)
    // process.exit()
  }
}
