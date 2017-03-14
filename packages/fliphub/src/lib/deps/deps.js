const pkg = require('../../paths').FLIPBOX_PKG
const deps = pkg.dependencies

require('./installDep')(Object.keys(deps))
