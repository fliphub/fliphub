const test = require('ava')
const fosho = require('fosho')
const {chain} = require('../')

function promiseFrom(index, timeout) {
  return () => new Promise(resolve => {
    return setTimeout(() => {
      console.log(index, timeout)
      resolve(index)
    }, timeout)
  })
}

test('promises can be chained', async t => {
  const one = promiseFrom(1, 300)
  const two = promiseFrom(2, 200)
  const three = promiseFrom(3, 500)
  const four = promiseFrom(4, 100)
  const promises = [one, two, three, four]

  const mapResults = []
  await chain(promises, (promise, last, index) => {
    mapResults.push({index, last})
    t.true(Array.isArray(mapResults))
    return promise()
  })
})
