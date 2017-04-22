const minimist = require('../minimist')

// minimist FAILS on this
// though `env` is parsed as an object...
// node test/minimist.js --eh=1 --env.ez='button' cantTouchThis=2 orThis -- andThisIsGroupedIn wut!
console.log(process.argv)
process.argv.push('')

const argv = minimist(process.argv.slice(2))
console.log(argv)
