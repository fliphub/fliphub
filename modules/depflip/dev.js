const {resolve} = require('path')

const pkgPath = resolve(process.cwd(), './package.json')
const pkg = require(pkgPath)
const install = require('./installDep')

module.exports = function dev(filter = false) {
  // get all dependencies,
  // put them together,
  // make sure we have them all
  const deps = Object.keys(pkg.dependencies || {})
  const dev = Object.keys(pkg.devDependencies || {})
  let all = deps.concat(dev)

  if (filter) {
    all = all.filter(filter)
  }

  install(all)
}
