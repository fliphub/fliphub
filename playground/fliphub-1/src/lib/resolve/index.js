// @TODO:
// recursively walk through
// find every string in the `resolve` array
// parse `.` notation
// resolve if it is not resolved
//
// fn to resolve a string
//
// fn resolve an array of strings

// var resolve = global.resolve
// var resolveTo = global.resolveTo

const path = require('path')
const rootpath = require('./rootpath')

let resolvedRoot = null
global.resolveRoot = (resolvee) => {
  if (!resolvedRoot) resolvedRoot = rootpath()
  return path.resolve(resolvedRoot, resolvee)
}

// could also bind root as first param in resolve
function makeResolver(root, helpers) {
  // resolve if needed
  var resolver = paths => {
    if (!paths) return paths
    if (path.isAbsolute(paths)) {
      // console.log(`${paths} was already absolute`)
      return paths
    }
    return resolve(paths)
  }

  // var msg = `⚠  root path was not provided, resolving to closest package json: ${rootpath()}`
  // helpers.log.text.color(msg, 'yellow')
  // helpers.log.text.color(root, 'yellow')

  resolver.root = root
  resolver.isAbsolute = path.isAbsolute
  if (!root) {
    resolver.root = rootpath()
    var msg = `⚠  root path was not provided, resolving to closest package json: ${rootpath()}`
    helpers.log.text.color(msg, 'yellow')
  }

  var resolve = paths => path.resolve(resolver.root, paths)
  var resolveTo = (paths, dir) => path.resolve(dir, paths)
  resolver.resolve = resolve
  resolver.resolveTo = resolveTo

  // or resolve matching
  resolver.forKeys = (obj, keys) => {
    Object.keys(obj).forEach(key => {
      if (keys.includes(key)) obj[key] = resolve(obj[key])
    })
    return obj
  }

  return resolver
}

module.exports = makeResolver
