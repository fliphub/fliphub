const log = require('./log')
const Aliaser = require('./alias')
const flags = require('./flags')
const makeResolver = require('./resolve')
const helpers = require('./helpers')
const port = require('./port')
const file = require('./file')
// const env = require('./env')

let lib = {flags, log, file, firstOpenPort: port}

// assign each helper to the lib / flatten
lib = Object.assign(lib, helpers)

// --- will be better with context or at least oop
// could have fn buildHelpers with configs to pass in to say alias and resolve?
function makeHelpers(options) {
  var {root, aliasDir} = options
  var resolve = makeResolver(root, lib)
  var rootpath = resolve('./')
  var aliaser = new Aliaser(rootpath, aliasDir, lib)

  lib.root = rootpath
  lib.aliaser = aliaser
  lib.resolve = resolve
  return lib
}

// for easy access to everything aside from aliaser and resolver
makeHelpers.lib = lib

module.exports = makeHelpers
