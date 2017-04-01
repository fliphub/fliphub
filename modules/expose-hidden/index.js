function assignHidden(obj, thisArg = null) {
  let bind = true
  if (thisArg === null || thisArg === undefined) {
    thisArg = obj
  }
  else if (thisArg === false) {
    thisArg = obj
    bind = false
  }

  const keys = Object.keys(obj)
  Object
    .getOwnPropertyNames(
      Object
        .getPrototypeOf(obj))
        .filter((key) => typeof obj[key] === 'function')
        .forEach((key) => {
          // console.log(key)
          if (!keys.includes(key)) {
            if (bind === true && typeof obj[key].bind === 'function') {
              obj[key] = obj[key].bind(thisArg)
            } else {
              obj[key] = obj[key]
            }
          }
        })

  return obj
}

assignHidden.version = '0.0.3'
module.exports = assignHidden
