const ScriptPermutator = require('./ScriptPermutator')

class PackageScripts {
  constructor(pkg) {
    this.permutator = ScriptPermutator
  }

  scriptsFrom(named) {
    const permutator = this.permutator
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

    // map configs to run with cli
    //
    // add to root package to manage all subpackages,
    // and optionally in sub packages
    //
    // check if it already exists
    // addScript('help')
    permutator.env('dev prod devprod')
    permutator.apps('app1 app2')
    permutator.addOperations('test compile run dry')
    const scripts = permutator.run()
    console.log(scripts)
  }
}
