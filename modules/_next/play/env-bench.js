const timer = require('fliptime')
const flags = require('../')

timer.start('calling flags')
// Object.assign(global, process.env)
// console.log(process.env)
// const env = Object.assign({}, process.env)
const env = process.env.NODE_ENV
let i = 0
while (i < 100) {
  if (env === 'development') {
    console.log('eh')
  }
  i++
}
timer.stop('calling flags').log('calling flags')

timer.start('env')
i = 0
while (i < 100) {
  if (process.env.NODE_ENV === 'development') {
    console.log('eh')
  }
  i++
}

// process.env.NODE_ENV += 'wut'
// console.log(process.env.NODE_ENV === 'development')

// const argv = process.argv[1]
// console.log(process.argv)
// const env = global.env
// const nonExistantForAllCases = global.nonExistantForAllCases
// const envs = flags('--env')
// const found = flags('nonExistantForAllCases')

timer.stop('env').log('env')
// timer.logLaps('flagger')
// console.log(envs, found)
