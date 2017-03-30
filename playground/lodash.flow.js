const test = require('ava')
const {fosho, log} = require('fosho')
const flow = require('lodash.flow')

function a(arg) {
  console.log('a')
  return 1 * (arg + 2)
}

function b(arg) {
  console.log('b')
  return `${arg} eh`
}

test.only('fosho', (t) => {
  const flowed = flow(a, b)(0)
  log.quick(flowed)
})
