const utils = require('realm-utils')
const realm = require('realm-js')
function isGenerator(fn) {
  return fn.constructor.name === 'GeneratorFunction'
}

const exportee = Object.assign({
  realm,
}, utils)

module.exports = exportee
