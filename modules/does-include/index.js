/**
 * @description
 * pass in a string to compare to an array of strings
 *
 * @example
 * // can is in canada, so yes.
 * stringContainsAnyOf('canada', ['eh', 'can'])
 */


/**
 * @param  {string} needle
 * @param  {Array<string>} haystack
 * @return {boolean}
 */
function strHasAny(needle, haystack) {
  for (let i = 0, len = haystack.length; i < len; i++)
    if (needle.includes(haystack[i])) return true
  return false
}

/**
 * @param  {string} needle
 * @param  {Array<string>} haystack
 * @return {boolean}
 */
function strHasAll(needle, haystack) {
  for (let i = 0, len = haystack.length; i < len; i++)
    if (!needle.includes(haystack[i])) return false
  return true
}

/**
 * @see strHasAny
 * @param  {Array<string>} needles
 * @param  {Array<string>} haystack
 * @return {boolean}
 */
function arrayHasAny(needles, haystack) {
  // loop needles
  for (let i = 0; i < needles.length; i++) {
    if (strHasAny(needles[i], haystack)) return true
  }
  return false
}

/**
 * @see strHasAll
 * @param  {Array<string>} needles
 * @param  {Array<string>} haystack
 * @return {boolean}
 */
function arrayHasAll(needles, haystack) {
  // loop needles
  for (let i = 0; i < needles.length; i++) {
    if (!strHasAll(needles[i], haystack)) return false
  }
  return true
}

/**
 * @see arrayHasAny
 * @see strHasAny
 * @param  {Array<string> | string} needle
 * @param  {Array<string>} haystack
 * @return {boolean}
 */
function includesAny(needle, haystack) {
  if (Array.isArray(needle)) return arrayHasAny(needle, haystack)
  return strHasAny(needle, haystack)
}

/**
 * @see arrayHasAll
 * @see strHasAll
 * @param  {Array<string> | string} needle
 * @param  {Array<string>} haystack
 * @return {boolean}
 */
function includesAll(needle, haystack) {
  if (Array.isArray(needle)) return arrayHasAll(needle, haystack)
  return strHasAll(needle, haystack)
}

/**
 * @see includesAll
 * @see includesAny
 * @param  {Array<string> | string} needle
 * @param  {Array<string>} haystack
 * @param  {boolean} any
 * @return {boolean}
 */
function anyOrAll(needle, haystack, any = true) {
  if (any === true) return includesAny(needle, haystack)
  return includesAll(needle, haystack)
}

Object.assign(anyOrAll, {
  all: includesAll,
  any: includesAny,
})

module.exports = anyOrAll
