const {resolve} = require('path')

const pkgPath = resolve(process.cwd(), './package.json')
const pkg = require(pkgPath)

// get all dependencies,
// put them together,
// make sure we have them all
const deps = Object.keys(pkg.dependencies || {})
const dev = Object.keys(pkg.devDependencies || {})
const all = deps.concat(dev)

require('./installDep')(all)
