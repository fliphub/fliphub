const test = require('ava')
const fosho = require('fosho')
const {Permutator} = require('../src')


// console.log(pkg)
// const tmpScripts = {
//   ['flip:lerna:scoped:prod:' + named]: `${prod_env} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}`,
//   ['flip:lerna:scoped:dev:' + named]: `${browser_env} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}`,
//   ['flip:lerna:scoped:browser:' + named]: `${dev_env} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}`,
// }
// pkg.scripts = Object.assign(pkg.scripts, tmpScripts)
// execSyncStd(`${lerna} exec ${lernaLog} ${scoped} -- ${tsc}`)
// Object.values(tmpScripts).forEach(script => {
//   execSyncStd(script)
// })

test(`creates a permutation of script operations
  with a default mapper`, (t) => {
  // @TODO: use the mapper here, make pkg json, easy
  const scriptCreator = new Permutator()
  // map configs to run with cli
  //
  // add to root package to manage all subpackages,
  // and optionally in sub packages
  //
  // check if it already exists
  // addScript('help')
  scriptCreator.env('dev,prod,devprod')
  scriptCreator.apps('app1,app2')
  scriptCreator.addOperations('test,compile,run,dry')

  const scripts = scriptCreator.run()
  console.log(scripts.scripts)
  fosho(Object.keys(scripts.scripts), t).lengthOf(24)
  // console.log(scripts)
})
