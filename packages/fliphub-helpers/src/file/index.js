const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

// http://stackabuse.com/read-files-with-node-js/
function read(dir, helpers) {
  try {
    // if (!dir) warn
    // isAbsolute(dir)
    // var resolved = helpers.resolve(dir)
  } catch (e) {

  }
  return fs.readFileSync(dir, 'utf8')
}

function write(dir, contents, helpers) {
  // get the final dir excluding the file
  var finalOutputDir = dir.split('/')
  finalOutputDir.pop()
  finalOutputDir = finalOutputDir.join('/')

  // make the final dir if it does not exist
  if (!fs.existsSync(finalOutputDir)) mkdirp.sync(finalOutputDir)

  // dir = helpers.resolve(dir)
  return fs.writeFileSync(dir, contents, 'utf8')
}

// is dir?
// @return boolean
// function isFile(file) {
//   if (file && file.includes('/')) {
//     return false
//   }
//   if (file.includes('.'))
//     return true
//   return false
// }
//
// https://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats
// isSocket
function isFile(file) {
  try {
    const result = fs.lstatSync(file).isFile()
    return result
  } catch (e) {
    return false
  }
}
function isDir(file) {
  try {
    return fs.lstatSync(file).isDirectory()
  } catch (e) {
    return false
  }
}

// @TODO: could trim too
function isRel(url) {
  if (!url || !url.slice) return false
  return (/^(\.){1,2}(\/){1,2}$/.test(url.slice(0, 3)) ||
    /(\/){1,2}(\.){1,2}(\/){1,2}/.test(url)) ||
    url.indexOf('./') === 0 ||
    url.indexOf('../') === 0
}

function getFileAndPath(file) {
  const split = file.split('/')
  const fileAndPath = {
    file: split.pop(),
    path: split.join('/'),
  }
  fileAndPath.dir = fileAndPath.path
  return fileAndPath
}

function getDirectories(srcpath, filter = ['.bin', '.cache']) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
    .filter(folder => !filter.includes(folder))
}


function fses() {}
fses.mkdirp = mkdirp
fses.getDirectories = getDirectories
fses.write = write
fses.read = read
fses.getFileAndPath = getFileAndPath
fses.isFile = isFile
fses.isDir = isDir
fses.isRel = isRel

module.exports = fses
