const {readFileSync} = require('fs')
const JSONChain = require('../')

// read it
const pkg = readFileSync('./package.json', 'utf8')

// chain it
const chain = new JSONChain(pkg)
  .parse() // will be done automatically, is optional
  .set('eh', ['some values']) // also as .update
  .del('eh') // also as .delete, .remove

// also as .val
const test = chain.get('scripts')
const has = chain.has('version')

// we deleted it
const aintHas = chain.has('eh')

// dotprop set, dotprop get
const hubub = chain.set('magic.dotprop', 'hubub').get('magic.dotprop')

console.assert(has === true, 'pkg has a version, can use .has')
console.assert(aintHas === false, '.has correctly reports values not there')
console.assert(hubub === 'hubub', 'can use .set and .get in chain, with dotprop')
console.assert(typeof test === 'object', 'can .get without any modifications')

console.log('all assertions pass :-)')
