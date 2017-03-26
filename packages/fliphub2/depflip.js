const installDep = require('depflip/installDep')
const pkg = require('./package.json')
const ignore = ['ava']

const deps = Object
  .keys(Object
    .assign(pkg.devDependencies, pkg.dependencies))
  .filter((key) => !ignore.includes(key))

installDep(deps)
process.exit()
