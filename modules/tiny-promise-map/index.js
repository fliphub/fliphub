// http://hellote.com/dynamic-promise-chains/
function Obj(obj, cb) {
  const arr = Object.keys(obj).map(key => ({
    key, val: obj[key],
  }))
  return PromiseMap(arr, item => {
    return cb(item)
  })
}

function PromiseMap(arr, cb) {
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
  return chain
}
PromiseMap.obj = Obj

module.exports = PromiseMap
