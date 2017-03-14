// loops through objects nested
// assigns or deletes property
//
// using var to keep easy scope
function deepReplaceProp(obj, property, val) {
  // https://github.com/aretecode/eslint-plugin-no-for-each
  var propKeys = Object.keys(obj)
  for (var i = 0, len = propKeys.length; i < len; i++) {
    var prop = propKeys[i]
    var child = obj[prop]

    // if child is an object and has the prop
    if (child && typeof child === 'object') {
      if (child[property]) {
        if (val === undefined) delete child[property]
        else child[property] = val
        // found it, but keep going in case it has nested refs
        deepReplaceProp(child, property)
      }
      else {
        // didn't find it, keep going, it is an object
        deepReplaceProp(child, property)
      }
    }
    // otherwise, is not an object, no more children
  }
}

// @TODO: if regex tests, convert to fn
function deepReplaceTest(obj, testVal, testProp, cb) {
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
        deepReplaceTest(val, testVal, testProp, cb)
      }
      else {
        // didn't find it, keep going, it is an object
        deepReplaceTest(val, testVal, testProp, cb)
      }
    } else if (testVal(val)) {
      cb({val, prop, obj, keys, i, len})
    }
    // otherwise, is not an object, no more children
  }
}

module.exports = {
  deepReplaceProp,
  deepReplaceTest,
}
