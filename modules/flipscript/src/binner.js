// const execa = require('execa')
const execa = require('child_process')
const exists = require('flipfile/exists')
const FC = require('flipcache')
const log = require('fliplog')
// const npmRunPath = require('npm-run-path')

const fc = FC.to('.fliphub/flipcache.json').json().clean()
// log
//   .data(fc.load().update('eh', 'giveitago').write())
//   .bold('flipcache data')
//   .echo()

function binRoot() {
  if (fc.has('npmBin')) return fc.val('npmBin')
  // exec in child_process, capture the buffer output, assign to var
  const npmBin = execa.execSync('npm bin').toString().replace(/\n/gmi, '')
  fc.update('npmBin', npmBin).write().val()
  return npmBin
}

function binFor(node_module) {
  const bin = binRoot(node_module) + '/' + node_module
  if (exists(bin)) return bin
  return false
}

function nodeModuleFor(node_module) {
  try {
    let resolved = require.resolve(node_module)
    if (exists(resolved)) return resolved
  } catch (e) {
    return false
  }
  return false
}

function binOrModule(node_module, noFallback) {
  const key = 'bin.' + node_module
  if (fc.has(key)) return fc.val(key)
  const bin = binFor(node_module) || nodeModuleFor(node_module)
  return fc.update(key, bin || node_module).write().val()
}

function isBinnable(node_module) {
  fc.load()
  // log.data(fc).bold('flipcache.isBinnable').echo()

  const key = 'bin.' + node_module
  if (fc.has(key)) return fc.val(key)
  const bin = binFor(node_module) || nodeModuleFor(node_module)
  return fc.update(key, bin).write().val()
}

function find(node_module) {
  // fc.load()
  return binOrModule(node_module)
}
find.isBinnable = isBinnable

module.exports = find
