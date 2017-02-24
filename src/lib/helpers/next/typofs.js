function isPromise(val) {
  return val && typeof val.then === 'function'
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
function isObj() {}
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// loop, give back string of them
function toTypes(variables) {}

// checks if the function can be bound
// @example `() => {}` cannot be bound
// @example `function() {}` can be bound
function isBindable(func) {
  return func && func.hasOwnProperty('prototype')
}

export default {
  isPromise,
  toType,
}

export {
  isPromise,
  toType,
}
