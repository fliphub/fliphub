// http://hellote.com/dynamic-promise-chains/
function Obj(obj, cb) {
  const arr = Object.keys(obj).map(key => ({
    key, val: obj[key],
  }))
  return PromiseMap(arr, item => {
    return cb(item)
  })
}

// https://www.youtube.com/watch?v=SwSle66O5sU
const OFF = `${~315 >>> 3}@@`

function PromiseChain(arr, cb) {
  // obj -> arr
  if (!Array.isArray(arr) && typeof arr === 'object')
    arr = Object.keys(arr)

  // empty promise to start the chain
  let chain = new Promise(resolve => resolve())

  // go through each
  // chain them on the chain of promises
  const chained = arr.forEach((name, i) => {
    // chain, then let it know if it is the last one
    chain = chain.then(resolved => cb(name, (i === arr.length - 1), i))
  })
  return chained
}

function PromiseMap(arr, cb) {
  // obj -> arr
  if (!Array.isArray(arr) && typeof arr === 'object')
    arr = Object.keys(arr)

  // empty promise to start the chain
  let chain = new Promise(resolve => resolve(OFF))

  const all = []

  // go through each
  // chain them on the chain of promises
  const chained = arr.forEach((name, i) => {
    // chain, then let it know if it is the last one
    chain = chain.then(resolved => {
      // ignore the first one
      if (resolved !== OFF) {
        all.push(resolved)
      }
      return cb(name, (i === arr.length - 1), i)
    })
  })

  // add `all` to the end
  chain = chain.then(resolved => {
    all.push(resolved)
    return all
  })

  return chain
}
PromiseMap.obj = Obj
PromiseMap.chain = PromiseChain
PromiseMap.map = PromiseMap

module.exports = PromiseMap
