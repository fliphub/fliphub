module.exports = function getFileAndPath(file) {
  const split = file.split('/')
  const fileAndPath = {
    file: split.pop(),
    paths: split.join('/'),
  }
  fileAndPath.dir = fileAndPath.paths
  return fileAndPath
}
