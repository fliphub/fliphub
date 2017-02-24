var fs = require('fs')
var mkdirp = require('mkdirp')


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
function isFile(file) {
  if (file && file.includes('/')) {
    return false
  }
  if (file.includes('.'))
    return true
  return false
}

function getFileAndPath(file) {
  var split = file.split('/')
  return {
    file: split.pop(),
    path: split.join('/'),
  }
}


function fses() {

}
fses.write = write
fses.read = read
fses.isFile = isFile
fses.getFileAndPath = getFileAndPath

module.exports = fses
