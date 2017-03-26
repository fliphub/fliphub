// http://stackoverflow.com/questions/742623/deleting-objects-in-javascript
// sync
// loops through objects nested
// deletes all properties recursive
module.exports = function del(obj) {
  // https://github.com/aretecode/eslint-plugin-no-for-each
  const propKeys = Object.keys(obj)
  for (let i = 0, len = propKeys.length; i < len; i++) {
    const prop = propKeys[i]
    const child = obj[prop]

    // if child is an object and has the prop
    if (child && typeof child === 'object') {
      del(child)
      delete obj[prop]
    } else {
      delete obj[prop]
    }
  }
}
