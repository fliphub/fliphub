/**
 * @example
 * in: [
 *  {id: 'eh', val: 'canada'},
 *  {id: 'moose', val: 'igloo'}
 * ]
 *
 * out: {
 *  'eh': {id: 'eh', val: 'canada'},
 *  'moose': {id: 'moose', val: 'igloo'}
 * }
 */
const arrToObj = require('arr-to-obj')

module.exports = function remapBy(values = [], prop = 'id') {
  if (!values) return {}


  if (Array.isArray(values)) {
    // if it does not have the prop, add it as the index
    // if it has it, and it is an array, join it
    values = values.map((data, i) => {
      if (!data[prop]) data[prop] = i
      if (Array.isArray(data[prop])) data[prop] = data[prop].join(',')
      return data
    })

    return arrToObj(values, {
      keyFn: ({i}) => values[i][prop],
      valFn: ({i, val}) => val,
    })
  }

  let asObj = Object.values(values)
  let remappedValues = {}

  // remap to add item id as object property
  let keys = Object.keys(asObj)
  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i]
    let val = asObj[key]

    remappedValues[val[prop]] = val
  }

  return remappedValues
}
