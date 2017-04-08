const toarr = require('to-arr')
const log = require('fliplog')
const inquirer = require('inquirer')
const Vorpal = require('vorpal')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const ChainedSets = require('flipchain/ChainedSet')
const _sortBy = require('lodash.sortby')
const flipscript = require('flipscript')
const flipcache = require('flipcache')
const flipflag = require('flipflag')

const vorpal = new Vorpal()

function orderByKeys(obj, orderFirst) {
  const orderedObj = {}
  orderFirst = orderFirst.reverse()
  const keys = Object.keys(obj)
  _sortBy(keys, key => orderFirst.indexOf(key))
    .reverse()
    .forEach(key => {
      orderedObj[key] = obj[key]
    })
  return orderedObj
}


// @NOTE: would be good as a decorator
// @NOTE: would be good as a decorator
class ChainedMap extends ChainedMapExtendable {
  toSteps() {
    let parent = this
    while (parent.parent) {
      parent = parent.parent
    }
    return parent
  }
}
class ChainedSet extends ChainedSets {
  toSteps() {
    let parent = this
    while (parent.parent) {
      parent = parent.parent
    }
    return parent
  }
}


module.exports = {
  flipcache,
  flipscript,
  orderByKeys,
  ChainedMap,
  ChainedSet,
  toarr,
  log,
  inquirer,
  vorpal,
  flipflag,
}
