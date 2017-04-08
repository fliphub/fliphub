const del = require('flipfile/del')
const read = require('flipfile/read')
const write = require('flipfile/write')
const log = require('fliplog')
// const File = require('../File')

// --- variables/config ---

let cb
let timeoutId
let {type, from, to, timeout, debug} = process.env
if (from === 'undefined') from = undefined
if (to === 'undefined') to = undefined

// --- ops ---

function autoRestore(fromPath, toPath) {
  // log.quick({from, to}, read(from), read(to))
  write(fromPath, read(toPath))
  if (debug) console.log('restored')
}

function autoRemove(path) {
  del(path)
  if (debug) console.log('deleted/removed')
}

// --- handle ---

if (from && to) {
  if (type === 'autoRestore') {
    cb = () => autoRestore(from, to)
    timeoutId = setTimeout(cb, timeout)
  }
}
else if (from && !to) {
  if (type === 'autoRemove') {
    cb = () => autoRemove(from, to)
    timeoutId = setTimeout(cb, timeout)
  }
}
else if (!from && to) {
  if (type === 'autoRemove') {
    cb = () => autoRemove(to)
    timeoutId = setTimeout(cb, timeout)
  }
}

if (debug) console.log({type, from, to, timeout})

// --- safety ---
// https://github.com/sindresorhus/exit-hook/blob/master/index.js

function callAndClear() {
  cb()

  // so it will not be called again in case multiple events occurr
  cb = () => {}
  clearTimeout(timeoutId)
}

// SIGTERM AND SIGINT will trigger the exit event.
process.once('uncaughtException', callAndClear)
process.once('SIGTERM', callAndClear)
process.once('SIGINT', callAndClear)

// And the exit event shuts down the child.
process.once('exit', callAndClear)
// process.once('beforeExit', callAndClear)
