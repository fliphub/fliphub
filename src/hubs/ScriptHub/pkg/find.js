function tryToRequire(file, helpers) {
  // var file = dirname + '/' + filename
  try {
    // var json = require(file)
    var json = helpers.file.read(file)
    json = JSON.parse(json)
    return json
  } catch (e) {
    // console.log('does not have file: ', {file}) // , e
  }
}

function getRegistry(dirname, options, helpers) {
  var files = helpers.walk(dirname, {recursive: true})
  // var files = getRegistryGlob(dirname)
  var result = {}
  files.forEach(dir => {
    dir = helpers.resolve.resolveTo(dir, __dirname)
    // console.log(dir)
    // console.log(dirname + '/' + dir, 'package.json')
    var pkg = tryToRequire(dir, helpers)

    // console.log(pkg,dir)
    if (pkg)  {
      // for testing diff
      // if (pkg.version == '0.0.1') pkg.version = '0.0.2'

      result[pkg.name] = {
        version: pkg.version,
        dir,
      }
    }
  })
  return result
}

function getRegistryGlob(cwd) {
  var glob = require('glob')
  // options is optional
  return glob.sync('../**/*.json', {
    ignore: '**/node_modules/**',
    cwd,
  })
}

function addScripts() {}
function addDeps({name, dev, version}) {}
function writePackage() {}
function writeRegistry(registry, file, helpers) {
  var stringified = JSON.stringify(registry, null, 2)
  helpers.file.write(file, stringified)
}


// if there is no written registry...
function diffs(currentRegistry, prodRegistry, helpers) {
  currentRegistry = tryToRequire(currentRegistry, helpers)
  prodRegistry = tryToRequire(prodRegistry, helpers)
  var diff = {}
  Object.keys(currentRegistry).forEach(name => {
    var curr = currentRegistry[name]
    var prod = prodRegistry[name]
    if (curr.version != prod.version) {
      helpers.log(curr, {level: 'has updates!'})
      diff[curr.name] = curr
    }
  })
  return diff
}

// write current registry to hydrate easier and production one?
// registry location on apps?
// if not there, default to where?
function hydrateRegistry() {
}

function packages(app, options, helpers) {
  if (!options.dir) options.dir = helpers.resolve('./')
  var registry = getRegistry(options.dir, options, helpers)
  return registry
}
function pkg(app, helpers) {
  var options = {}
  var upupup = '../../../'
  if (!options.dir) options.dir = helpers.resolve(upupup + 'packages/')
  helpers.log.text(options.dir)

  var registry = getRegistry(options.dir, options, helpers)
  // registry = getRegistryGlob()

  // @TODO: on `release` env change this
  var prod = true
  var output
  var currentOutput = helpers.resolve('./build/generated/currentRegistry.json')
  var prodOutput = helpers.resolve('./build/generated/currentRegistryProd.json')

  output = currentOutput
  if (prod) output = prodOutput
  // writeRegistry(registry, output, helpers)

  var diffs = diffs(currentOutput, prodOutput, helpers)
  app.diffs = diffs
  return app
}
packages.addScripts = addScripts
packages.addDeps = addDeps
packages.writePackage = writePackage
packages.getRegistry = getRegistry
packages.writeRegistry = writeRegistry

module.exports = pkg
