const test = require('ava')
const fosho = require('fosho')
const promiseMap = require('../')

function promiseFrom(index, timeout) {
  return () => new Promise(resolve => {
    return setTimeout(() => {
      // console.log(index, timeout)
      resolve(index)
    }, timeout)
  })
}

test('promises execute in order', async t => {
  t.plan(3)

  const one = promiseFrom(1, 300)
  const two = promiseFrom(2, 200)
  const three = promiseFrom(3, 500)
  const four = promiseFrom(4, 100)
  const promises = [one, two, three, four]

  const mapResults = []
  const all = await promiseMap(promises, (promise, last, index) => {
    // console.log(promise, index, last)
    mapResults.push({index, last})
    return promise()
  })

  fosho(all.length, t).num().eq(4)
  t.deepEqual(all, ([1, 2, 3, 4]))
})
