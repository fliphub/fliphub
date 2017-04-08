const flipglob = require('flipglob')
const insertAt = require('insert-at-index')
const real = require('izz/realNotEmpty')
const toarr = require('to-arr')

function prefixer(prefix, names) {
  return toarr(names).map(name => {
    if (!name.includes(prefix)) name = prefix + '-' + name
    return name
  })
}

module.exports = {
  flipglob,
  insertAt,
  real,
  toarr,
  prefixer,
}
