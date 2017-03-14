// ------------------- spread -------------

// from...
const eh = {}
const canada = {}
const spread = {
  foo: 'eh',
  ...eh,
  ...canada,
}

// into...
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    for (var key in source)
      if (Object.prototype.hasOwnProperty.call(source, key))
        target[key] = source[key]
  }
  return target
}

var eh = {}
var canada = {}
var spread = _extends({
  foo: 'eh',
}, eh, canada)


// ------------------- spread arr -------------

// from...
const ehs = undefined
const vals = []
const canada = [vals, ...ehs]


// into...
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i]
    return arr2
  }
  else return Array.from(arr)
}

var ehs = []
var vals = []
var canada = [vals].concat(_toConsumableArray(ehs))
