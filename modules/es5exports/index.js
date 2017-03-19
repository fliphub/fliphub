module.exports = function _extends(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    var keys = Object.keys(source)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      target[key] = source[key]
    }
  }

  return target
}
