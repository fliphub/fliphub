// @example
// defaults to encoding buffer
// https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
// https://github.com/sindresorhus/execa#execasyncfile-arguments-options
// https://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html
// https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
// https://gist.github.com/s4y/1215700
// http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn
// https://www.npmjs.com/package/approot
const exists = require('flipfile/exists')
const path = require('path')

function splitSlashAndPop(str) {
  // split at every folder
  str = str.split('/')

  // remove last
  str.pop()

  return str
}

function removeNodeModulesAndBin(str) {
  str = splitSlashAndPop(str)

  // remove node modules
  return str.slice(0, str.length - 1).join('/')
}

function hasPkg(file, dir) {
  return exists(dir + '/' + file) || exists(dir + '/' + file + '.js')
}

function upDir(dir) {
  return splitSlashAndPop(dir).join('/')
}

function npmUp(currentPkgPath) {
  const {execFileSync} = require('child_process')
  return removeNodeModulesAndBin(
    execFileSync('npm', ['bin'], {
      cwd: upDir(currentPkgPath),
    }).toString())
}

function rootable(args) {
  args = Object.assign({depth: 10, asObj: false, file: 'monono'}, args)
  const has = hasPkg.bind(null, args.file)
  const paths = {
    stack: [],
    farthest: false,
    nearest: false,
  }

  paths.farthest = process.cwd()
  paths.nearest = paths.farthest

  paths.farthest = paths.nearest
  paths.stack.push(paths.attempt)

  // if we should go up more than 1 directory
  if (args.depth > 1) {
    paths.attempt = paths.farthest
    paths.found = paths.found

    // keep going, check if it has the file
    for (let i = 0; i < args.depth; i++) {
      paths.attempt = upDir(paths.attempt)
      paths.stack.push(paths.attempt)

      if (paths.attempt && has(paths.attempt)) paths.found = paths.attempt
    }

    // found it, use the one that was found
    if (paths.found) paths.farthest = paths.found

    // we do not resolve it, let's try again using
    else {
      paths.attempt = path.dirname(require.main.filename)

      for (let i = 0; i < args.depth; i++) {
        paths.attempt = upDir(paths.attempt)
        paths.stack.push(paths.attempt)

        if (paths.attempt && hasPkg('package.json', paths.attempt)) {
          paths.found = paths.attempt
        }
      }

      if (paths.found) paths.farthest = paths.found
    }
  }

  if (args.asObj) return paths
  return paths.farthest
}

module.exports = rootable
