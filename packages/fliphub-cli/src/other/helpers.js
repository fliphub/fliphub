const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const _sortBy = require('lodash.sortby')
const inspect = require('./inspect')

// scoped by ref object to set the root elsewhere and be able to use it here
const deep = {
  root: null,
}
function read(dir) {
  if (deep.root) dir = path.resolve(deep.root, dir)
  return fs.readFileSync(dir, 'utf8')
}
function write(dir, contents) {
  if (deep.root) dir = path.resolve(deep.root, dir)

  // get the final dir excluding the file
  let finalOutputDir = dir.split('/')
  finalOutputDir.pop()
  finalOutputDir = finalOutputDir.join('/')

  // make the final dir if it does not exist
  if (!fs.existsSync(finalOutputDir)) mkdirp.sync(finalOutputDir)

  return fs.writeFileSync(dir, contents, 'utf8')
}

function tryJSON(json) {
  try {
    const parsed = JSON.parse(json)
    return parsed
  } catch (e) {
    return false
  }
}

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

module.exports = {
  read, write, tryJSON, path, fs, deep, inspect, orderByKeys,
}
