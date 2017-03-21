const funcProto = Function.prototype
const objectProto = Object.prototype
const funcToString = funcProto.toString
const hasOwnProperty = objectProto.hasOwnProperty
const objectCtorString = funcToString.call(Object)
const objectToString = objectProto.toString
const objectTag = '[object Object]'
const iss = require('is')
const isObject = require('./obj')
const isPromise = require('./promise')
const isBindable = require('./bindable')
const toType = require('./toType')
const isObjectLike = require('./objLike')
const isGenerator = require('./gen')
const isFunction = require('./func')
const windows = require('./windows')
const isNotSet = require('./notSet')
const isSet = require('./set')
const isMap = require('./map')
const num = require('./num')
const arrOf = require('./arrOf')

// @TODO: add support for plurals
// loop, give back string of them
function toTypes(variables) {
  return variables.map(variable => toType(variables))
}

// isHostObject
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '')
    } catch (e) { }
  }
  return result
}


// isPlainObject
function isPlainObject(value) {
  if (!this.isObjectLike(value) ||
    objectToString.call(value) != objectTag || this.isHostObject(value)) {
    return false
  }
  var proto = this.overArg(Object.getPrototypeOf, Object)(value)
  if (proto === null) {
    return true
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString)
}

function webpackCli() {
  const flags = require('./flags')
  return flags('bin/webpack', {type: 'bool'})
}

const is = Object.assign({
  num,
  windows,
  real: (val) => !isNotSet(val),
  notSet: isNotSet,
  emptyStr: (val) => val === '',
  str: (value) => typeof value === 'string',
  string: (value) => typeof value === 'string',

  // careful for es3...
  class: require('./class'),

  set: isSet,
  map: isMap,

  array: Array.isArray,
  arr: Array.isArray,
  arrOf,

  isObject,
  obj: isObject,
  isObjLike: isObjectLike,
  plainObject: isPlainObject,
  plainObj: isPlainObject,
  hostObject: isHostObject,
  hostObj: isHostObject,

  function: isFunction,
  fn: isFunction,
  bindable: isBindable,
  promise: isPromise,
  generator: isGenerator,
  gen: isGenerator,

  webpackCli,

  toType,
  toTypes,
}, iss)

is.notReal = val => !is.real(val)

module.exports = is
