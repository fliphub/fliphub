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
  return arr.forEach(name => {
    chain = chain.then(resolved => cb(name))
  })
}
PromiseMap.obj = Obj

module.exports = PromiseMap
