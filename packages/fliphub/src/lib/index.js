const log = require('./log')
const Aliaser = require('./alias')
const flags = require('./flags')
const makeResolver = require('./resolve')
const helpers = require('./helpers')
const port = require('./port')
const file = require('./file')
require('./err')
// const env = require('./env')

let lib = {flags, log, file, firstOpenPort: port}

// assign each helper to the lib / flatten
lib = Object.assign(lib, helpers)

// class Helpers {
//   flags() { return lib.flags }
//   fs() { return lib.fs }
//   path() { return lib.path }
//   tosource() { return lib.tosource.call(null, arguments) }
//   walk() { return lib.walk.call(null, arguments) }
//   es5exports() { return lib.es5exports.call(null, arguments) }
//   injectPlugins() { return lib.injectPlugins.call(null, arguments) }
//   injectLoaders() { return lib.injectLoaders.call(null, arguments) }
//   getOutputPath() { return lib.getOutputPath.call(null, arguments) }
//   strIncludesAnyOf() { return lib.strIncludesAnyOf.call(null, arguments) }
//   log() { return lib.log.call(null, arguments) }
//   firstOpenPort() { return lib.firstOpenPort.call(null, arguments) }
// }

function debugFor(keys, msg, color, data) {
  // console.log(this)
  let debug = this.app.debug
  let shouldLog = false
  if (!Array.isArray(keys)) keys = [keys]

  if (debug) {
    const debugKeys = Object.keys(debug)
    for (let i = 0; i < debugKeys.length; i++) {
      const key = debugKeys[i]
      if (keys.includes(key)) {
        shouldLog = true
        break
      }
    }
  } else {
    debug = false
  }
  if (!shouldLog) {
    // console.log('should not log', color, msg, data)
    // console.log('should not log', debug)
    // return
  }

  let logg = lib.log
  const xterm =
    typeof color !== 'string' &&
    (Array.isArray(color) || Number.isInteger(color))

  if (typeof msg === 'object' && typeof color === 'object' && !data)
    logg(msg, color)
  else if (data && data.verbose) {
    var tolog = Object.values(data).filter((key) => key != 'verbose')
    tolog = tolog.shift()
    logg.verbose(tolog, {level: msg})
  }
  else if (debug.verbose)
    logg.verbose(data, {color, level: msg})
  else if (!data && xterm)
    logg.text.color.xterm(msg, color) // {data}
  else if (xterm)
    logg.text.color.xterm(msg, color)
  else if (!data && typeof color !== 'object')
    logg.text.color(msg, color)
  else if (!data && typeof color === 'object')
    logg(msg, color)
  else
    logg(data, {color, level: msg})
}

global.logger = lib.log
global.badLog = (data) => {
  // lib.log(data, {color: 'bgRed.black', level: ' 🤦  badLog ', time: false, verbose: true})
  lib.log(data, {color: 'bgRed.black', level: ' 🤦  badLog ', time: false, verbose: true})
}


lib.debugFor = (thisArg) => debugFor.bind(thisArg)
lib.debugForKeys = () => debugFor.bind({app: {debug: {all: true}}})

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
