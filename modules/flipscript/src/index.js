// const {custom} = require('inspector-gadget')
// require('util').inspect.defaultOptions.customInspect = false

const {flipglob, insertAt, real, toarr, prefixer} = require('./deps')
const Script = require('./Script')
const Scripts = require('./Scripts')
const Remember = require('./Remember')
const Flag = require('./Flag')
const Permutator = require('./ScriptPermutator')
const Core = require('./Core')
const binner = require('./binner')


module.exports = {
  flipglob,
  insertAt,
  real,
  toarr,
  prefixer,
  binner,

  Script,
  Scripts,
  Remember,
  Flag,
  Permutator,
  Core,
  ScriptFlip: Core,
}
