// array items become object values,
// fn maps items to keys
function arrToObj(array, fn) {
  if (!fn) {
    fn = (val, i, array, obj) => {
      // if (typeof val === 'object') {
      //   obj = Object.assign(obj, val)
      // } else if (typeof val === 'string') {
      //
      // }
      return val
    }
  }

  var obj = {}
  var len = array.length
  for (var i = 0; i < len; i++) {
    var val = array[i]
    var key = fn(val, i, array, obj)
    obj[key] = val
  }
  return obj
}

module.exports = arrToObj
