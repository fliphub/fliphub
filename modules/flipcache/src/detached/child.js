const del = require('flipfile/del')
const read = require('flipfile/read')
const write = require('flipfile/write')
const log = require('fliplog')
const FlipCache = require('../Core')
// const File = require('../File')

// --- variables/config ---

let cb
let timeoutId
let {type, from, to, timeout, debug, key} = process.env
if (from === 'undefined') from = undefined
if (to === 'undefined') to = undefined

// get the last one
// mark it as ended
function end() {
  const meta = FlipCache
    .to('.fliphub/flipcaches.json')
    .json()
    .load(true)
    .setIfNotEmpty('autoRestore', {})
    .setIfNotEmpty('autoRemove', {})
    .setIfNotEmpty('backups', {})

  const cacheForType = meta.get(type)
  const cache = cacheForType[key]

  if (!cache) {
    return log
      .data({meta: meta.clean(), key, type, cacheForType})
      .red('had no cache in child')
      .echo(false)
  }

  const lastOfType = cache.length - 1
  const last = cache[lastOfType]

  if (!last) {
    return log
      .data({meta: meta.clean(), key, type, cacheForType})
      .red('had no meta in child')
      .echo(false)
  }

  last.end = Date.now()
  meta.write()

  return log
    .data({meta: meta.clean(), key, type, cacheForType})
    .red('child cache meta end')
    .echo(false)
}

// --- ops ---

function autoRestore(fromPath, toPath) {
  // log.quick({from, to}, read(from), read(to))
  end()
  write(fromPath, read(toPath))
  if (debug) console.log('restored')
}

function autoRemove(path) {
  end()
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
