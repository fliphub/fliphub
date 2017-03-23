const installDep = require('depflip/installDep')
const pkg = require('./package.json')

const deps = Object.assign(pkg.devDependencies, pkg.dependencies)
installDep(Object.keys(deps))
process.exit()
