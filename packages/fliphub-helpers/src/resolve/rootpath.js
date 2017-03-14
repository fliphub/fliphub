
// @example
// /User/code/back/webpack-env-builder/example/node_modules
// defaults to encoding buffer
// https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
var roots
try {
  var {execSync} = require('child_process')
  roots = execSync('npm root', {encoding: 'utf8'}).split('/')
  roots = roots.slice(0, roots.length - 1).join('/')
} catch (e) {
  roots = require('app-root-path').toString()
}


// ---
// var roots = execSync('npm root', {encoding: 'utf8'}).split('/')
// roots.pop()
// roots = roots.join('/')
// ---
// var oneline = execSync('npm root', {encoding: 'utf8'})
// oneline = oneline.slice(0, oneline.lastIndexOf('/'))

module.exports = () => roots
