// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
module.exports = function fliphash(str) {
  //  || typeof str !== 'string'
  if (str === undefined || str === null) {
    console.log('you passed not real value to fliphash')
    return str
  }
  var hash = 0, len = str.length
  if (len == 0) return 0
  for (i = 0; i < len; i++) {
    char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}
