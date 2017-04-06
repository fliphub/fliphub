require('monono')
const eh = require('eh')
console.log(eh)

// even though it is in another modules packages
const _ = require('lodash')
console.log(Object.keys(_).length)
