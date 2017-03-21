// @TODO: if regex tests, convert to fn
function deepReplaceMatch(obj, testVal, testProp, cb) {
  // https://github.com/aretecode/eslint-plugin-no-for-each
  var keys = Object.keys(obj)
  for (var i = 0, len = keys.length; i < len; i++) {
    var prop = keys[i]
    var val = obj[prop]
    console.verbose({prop, val, keys, i})

    // if val is an object and has the prop
    if (val && typeof val === 'object') {
      if (testVal(val)) {
        cb({val, prop, obj, keys, i, len})
        // found it, but keep going in case it has nested refs
        deepReplaceMatch(val, testVal, testProp, cb)
      }
      else {
        // didn't find it, keep going, it is an object
        deepReplaceMatch(val, testVal, testProp, cb)
      }
    } else if (testVal(val)) {
      cb({val, prop, obj, keys, i, len})
    }
    // otherwise, is not an object, no more children
  }
}

module.exports = deepReplaceMatch
