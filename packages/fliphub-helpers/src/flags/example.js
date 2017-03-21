const timer = require('fliphub-helpers/src/timer')
const flags = require('fliphub-helpers/src/flags')

timer.start('calling flags')

const envs = flags('--env')
const found = flags('nonExistantForAllCases')

timer.stop('calling flags').log('calling flags')
timer.logLaps('flagger')
console.log(envs, found)
