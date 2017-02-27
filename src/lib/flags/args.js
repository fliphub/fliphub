const nodeFlags = require('./node-flags')
const yargs = require('yargs')

// searches through the commandline arguments
// check if it matches what we are searching for
// string or array later
function get(needle, options) {
  var defaults = {
    includeSlash: false,
  }
  options = Object.assign(defaults, options)
  var haystack = process.argv

  // console.log('SEARCH:', needle)
  for (var i = 0; i < haystack.length; i++) {
    const arg = haystack[i]
    if (!arg || !arg.includes) continue

    // because the location of the file being run is in the args
    if (!needle.includes('/') && !options.includeSlash && arg.includes('/')) {
      continue
    }

    if (arg.includes(needle) || needle.includes(arg)) {
      let argStripped = arg
      if (arg.replace) argStripped = arg.replace('--', '').replace('env.', '')
      if (argStripped.includes(needle) || needle.includes(argStripped)) {
        // if it is an empty string
        // that is evaluated to false in a condition
        if ('' === argStripped) return true
        return argStripped
      }
    }
  }

  // because webpack2 does not allow custom cli args
  if (!needle.includes('env'))
    return get('env.' + needle, haystack, options)

  return false
}

// @example
// --html --template=./demo/index.html
//
// argVal('template')
// -> argd
// -> --template=./demo/index.html
// -> template=./demo/index.html
// -> ./demo/index.html
//
function val(search, options) {
  var arg = get(search, options)
  if (arg === true) return true
  if (!arg) return false
  return arg
    .replace('--', '')
    .replace(search, '')
    .replace('env.', '')
    .replace('=', '')
}

// or hasOwnProperty?
// could be in other helper libs
function findIn(prop, obj) {
  if (obj[prop]) return obj[prop]
  return null
}

// @TODO:
// - [ ] flush out
// - [x] bool
// - [x] default undefined
// - [ ] parse str
// - [ ] safety to array
function realValue(value, options) {
  if (options && options.type) {
    var type = options.type

    if (type === 'bool' || type === 'boolean') {
      if (value === 'true') return true
      if (value === 'false') return true
      if (typeof value === 'string') {
        if (value.includes('true')) return true
        if (value.includes('false')) return false
      }
      if (value == 'true') return true
      if (value == 'false') return false

      return !!value
    }

    // be more specific
    if (type === 'arr' || type === 'array') {
      if (value && value.includes) {
        if (value.includes(',')) return value.split(',')
        if (typeof value === 'string') return [value]
      } else {
        return [value]
      }
    }
  }

  if (Number.isInteger(value)) return value + 0
  if (value === 'true') return true
  if (value === 'false') return true
  if (typeof value === 'string') {
    if (value.includes('true')) return true
    if (value.includes('false')) return false
  }

  if (value == 'undefined') return undefined
  return value
}

// @TODO:
// - [ ] optimize
// - [ ] respect options for which vals to search through
const flags = {
  searchAll(nEeDlE, options) {
    if (!options) options = {}
    let value
    let NEEDLE = nEeDlE.toUpperCase()
    let needle = nEeDlE.toLowerCase()
    options.needle = needle

    // global.log({nEeDlE, needle, NEEDLE})

    // log('1', {level: 'val'})
    value = val(nEeDlE, options) || val(needle, options) || val(NEEDLE, options)
    if (value) return realValue(value, options)

    // log('2', {level: 'get'})
    value = nodeFlags.get(nEeDlE) || nodeFlags.get(NEEDLE) || nodeFlags.get(needle)
    if (value) return realValue(value, options)

    // log('3', {level: 'env'})
    value = findIn(nEeDlE, process.env) || findIn(needle, process.env) || findIn(NEEDLE, process.env)
    if (value) return realValue(value, options)

    // log('4', {level: 'global'})
    value = findIn(nEeDlE, global) || findIn(needle, global) || findIn(NEEDLE, global)
    if (value) return realValue(value, options)

    if (options && options.default) return options.default
  },
  val,
  get,
  yargs,
}

module.exports = flags
