const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const deepmerge = require('deepmerge')
const log = require('fliplog')
const is = require('izz')

// http://stackoverflow.com/questions/7032550/javascript-insert-an-array-inside-another-array
// http://stackoverflow.com/questions/1348178/a-better-way-to-splice-an-array-into-an-array-in-javascript/41465578#41465578
// http://stackoverflow.com/questions/38060705/replace-element-at-specific-position-in-an-array-without-mutating-it
// function insertArrAt(array, index, arrayToInsert) {
//   // Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert))
//   // return array.slice.apply([index, 0].concat(arrayToInsert))
//   return array.slice(index, 0).apply([index, 0].concat(arrayToInsert))
//   return array
// }

function insertArrAt(arr, index, val) {
  if (index < arr.length) {
    return [
      ...arr.slice(0, index),
      ...val,
      ...arr.slice(index + 1),
    ]
  } else {
    return [
      ...arr,
      ...Array(index - arr.length),
      ...val,
    ]
  }
}


module.exports = class Config extends ChainedMapExtendable {
  toConfig() {
    const config = this.entries()
    // log.data(config).exit()

    if (!config.plugins) config.plugins = []
    config.plugins = config.plugins.filter(real => real)
    // log.verbose().data(config).text('plugins').echo()
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
