const log = require('./log')
const Aliaser = require('./alias')
const flags = require('./flags')
const makeResolver = require('./resolve')
const helpers = require('./helpers')
const port = require('./port')
const file = require('./file')
require('./err')


// could have fn buildHelpers with configs to pass in to say alias and resolve?
function makeHelpers(options) {
  var {root} = options
  var resolve = makeResolver(root, lib)
  var rootpath = resolve('./')

  lib.root = rootpath
  lib.aliaser = aliaser
  lib.resolve = resolve
  return lib
}

// for easy access to everything aside from aliaser and resolver
makeHelpers.lib = lib

module.exports = makeHelpers
