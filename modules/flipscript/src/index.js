// const {custom} = require('inspector-gadget')
require('util').inspect.defaultOptions.customInspect = false

module.exports = {
  binner: require('./binner'),
  ScriptFlip: require('./Core'),
  Permutator: require('./ScriptPermutator'),
}
