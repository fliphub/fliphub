const pkg = require('../../package.json')
const deps = pkg.devDependencies

require('./installDep')(Object.keys(deps))
