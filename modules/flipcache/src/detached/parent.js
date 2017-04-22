// @TODO: should be using flipscript here, but then circular dep :-(
//
// we would use execa, but it auto-kills child processes
//
// https://www.exratione.com/2013/05/die-child-process-die/
// http://stackoverflow.com/questions/30708801/node-js-child-processes-being-killed-when-parent-dies
// http://mayanklahiri.github.io/node-superchild/superchild.html
// https://www.npmjs.com/package/infant
const {spawn} = require('child_process')
const {resolve} = require('path')

let children = []
const childPath = resolve(__dirname, 'child.js')
function detachedParent(env = process.env) {
  const child = spawn('node', [childPath], {
    detached: true,
    stdio: 'inherit', // ['ignore'],
    env,
  })
  child.unref()
  children.push(child)
  return child
}

detachedParent.children = children

module.exports = detachedParent
