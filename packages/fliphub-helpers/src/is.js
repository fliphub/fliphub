const funcProto = Function.prototype
const objectProto = Object.prototype
const funcToString = funcProto.toString
const hasOwnProperty = objectProto.hasOwnProperty
const objectCtorString = funcToString.call(Object)
const objectToString = objectProto.toString
const objectTag = '[object Object]'
const funcTag = '[object Function]'
const funcTag2 = '[Function]'
const genTag = '[object GeneratorFunction]'
const iss = require('is')


// @TODO: add support for plurals

function isPromise(val) {
  return val
    && typeof val.then === 'function' &&
    typeof val.catch === 'function'
}

// @TODO:
// use some sugar syntax to replace this function call
// with the variable name passed to it
//
// isObject(variableName) ---> variableName && typeof variableName === 'object'
//
// https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
//
// could also add this in webpack provide / define plugin
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// loop, give back string of them
function toTypes(variables) {
  return variables.map(variable => toType(variables))
}

// checks if the function can be bound
// @example `() => {}` cannot be bound
// @example `function() {}` can be bound
function isBindable(func) {
  return func && func.hasOwnProperty('prototype')
}

// isNotSet (undefined and null will return true)
function isNotSet(input) {
  return input === undefined || input === null
}

function isMap(input) {
  if (typeof Map === 'undefined') {
    return false
  }
  return input instanceof Map
}

function isSet(input) {
  if (typeof Set === 'undefined') {
    return false
  }
  return input instanceof Set
}

function isFunction(value) {
  var tag = isObject(value) ? objectToString.call(value) : ''
  return tag === funcTag2 || tag == funcTag || tag == genTag
}

function isObject(input) {
  var type = typeof input
  return !!input && (type == 'object' || type == 'function')
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

// isObjectLike
function isObjectLike(value) {
  return !!value && typeof value == 'object'
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

function isGenerator(fn) {
  return fn.constructor.name === 'GeneratorFunction'
}

function webpackCli() {
  const flags = require('./flags')
  return flags('bin/webpack', {type: 'bool'})
}

const is = Object.assign({
  windows: () => /^win/.test(process.platform),
  real: (val) => !isNotSet(val),
  notSet: isNotSet,
  str: (value) => typeof value === 'string',
  string: (value) => typeof value === 'string',

  set: isSet,
  map: isMap,

  array: Array.isArray,
  arr: Array.isArray,

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

module.exports = is
