// https://webpack.js.org/guides/code-splitting-import/#dynamic-import
let values = [
  {
    name: 'oo',
    ehoh: true,
  },
]
const prop = 'name'

const arrToObj = require('arr-to-obj')

if (Array.isArray(values)) {
  values = arrToObj(values, {
    keyFn: ({i}) => values[i][prop],
    valFn: ({i, val}) => val,
  })
}
console.log(values)
