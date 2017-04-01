// @TODO: should be using flipscript here, but then circular dep :-(
//
// https://www.exratione.com/2013/05/die-child-process-die/
// http://stackoverflow.com/questions/30708801/node-js-child-processes-being-killed-when-parent-dies
// http://mayanklahiri.github.io/node-superchild/superchild.html
// https://www.npmjs.com/package/infant
const {spawn} = require('child_process')

let children = []

module.exports = function detachedParent(env = process.env) {
  const child = spawn('node', ['DetachedChild.js'], {
    detached: true,
    stdio: 'inherit', // ['ignore'],
    env,
  })
  children.push(child)
  return child
}
