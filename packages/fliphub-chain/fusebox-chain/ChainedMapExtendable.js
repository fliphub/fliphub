const ChainedMap = require('./ChainedMap')

function firstToUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function removePrefix(string, prefix) {
  if (string.indexOf(prefix) === 0) {
    string = string.slice(prefix.length)
  }
  return string.charAt(0).toLowerCase() + string.slice(1)
}
function addPrefix(string, prefix) {
  return prefix + firstToUpper(string)
}

// @TODO: use key or val fns
function arrToObj(array, fn) {
  if (typeof fn !== 'function') {
    const returnee = fn
    fn = (val, i, array, obj) => returnee
  }
  const obj = {}
  const len = array.length
  for (let i = 0; i < len; i++) {
    const val = fn(i, array, obj)
    const key = array[i]
    obj[key] = val
  }
  return obj
}

module.exports = class extends ChainedMap {
  // @TODO: extendBool which would add `no` firstChar.toUpperCase() + rest()
  extendBool(methods, val, prefix = 'no') {
    this.extendWith(methods, val)
    this.extendWith(methods.map(method =>
      addPrefix(method, prefix)), !val, prefix)
  }

  extendWith(methods, val, prefix) {
    methods = arrToObj(methods, val)
    const keys = Object.keys(methods)
    this.shorthands = [...this.shorthands, ...keys]
    keys.forEach(method => {
      this[method] = (value = methods[method]) => {
        return this.set(removePrefix(method, 'no'), value)
      }
    })
  }
  extendFalse(methods) { this.extendWith(methods, false) }
  extendTrue(methods) { this.extendWith(methods, true) }

  extendDefault(methods) {
    this.shorthands = [...this.shorthands, ...methods]
    Object.keys(methods).forEach(method => {
      this[method] = (value = methods[method]) => this.set(method, value)
    })
  }
}
