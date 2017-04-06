// @TODO: note the lerna api provides this functionality,
// @see ./Publisher
const {resolve} = require('path')
const {read, write, walk, glob} = require('flipfile/all')
const FC = require('flipcache')
const log = require('fliplog')

function getRegistry(dirname, options) {
  let files = walk(dirname, {recursive: true})
  // var files = getRegistryGlob(dirname)
  let result = {}
  files.forEach(dir => {
    dir = resolve(__dirname, dir)
    // console.log(dir)
    // console.log(dirname + '/' + dir, 'package.json')
    let pkgjson = read.json(dir)

    // console.log(pkgjson,dir)
    if (pkgjson)  {
      // for testing diff
      // if (pkgjson.version == '0.0.1') pkgjson.version = '0.0.2'

      result[pkgjson.name] = {
        version: pkgjson.version,
        dir,
      }
    }
  })
  return result
}

function getRegistryGlob(cwd) {
  // options is optional
  return glob.sync('../**/*.json', {
    ignore: '**/node_modules/**',
    cwd,
  })
}

function addScripts() {}
function addDeps({name, dev, version}) {}
function writePackage() {}
function writeRegistry(registry, file) {
  let stringified = JSON.stringify(registry, null, 2)
  write(file, stringified)
}


// if there is no written registry...
function diffs(currentRegistry, prodRegistry) {
  currentRegistry = read.json(currentRegistry)
  prodRegistry = read.json(prodRegistry)
  let diff = {}
  Object.keys(currentRegistry).forEach(name => {
    let curr = currentRegistry[name]
    let prod = prodRegistry[name]
    if (curr.version != prod.version) {
      log(curr, {level: 'has updates!'})
      diff[curr.name] = curr
    }
  })
  return diff
}

// write current registry to hydrate easier and production one?
// registry location on apps?
// if not there, default to where?
function hydrateRegistry() {}

function packages(app, options) {
  if (!options.dir) options.dir = resolve('./')
  let registry = getRegistry(options.dir, options)
  return registry
}
function pkg(app) {
  let options = {}
  let upupup = '../../../'
  if (!options.dir) options.dir = resolve(upupup + 'packages/')
  log.text(options.dir)

  let registry = getRegistry(options.dir, options)
  // registry = getRegistryGlob()

  // @TODO: on `release` env change this
  let prod = true

  const current = FC.to('currentRegistry.json')
  const prod = FC.to('currentRegistryProd.json')

  let currentOutput = resolve('./build/generated/currentRegistry.json')
  let prodOutput = resolve('./build/generated/currentRegistryProd.json')

  output = currentOutput
  if (prod) output = prodOutput
  // writeRegistry(registry, output)

  app.diffs = diffs(currentOutput, prodOutput)
  return app
}
packages.addScripts = addScripts
packages.addDeps = addDeps
packages.writePackage = writePackage
packages.getRegistry = getRegistry
packages.writeRegistry = writeRegistry

module.exports = pkg
