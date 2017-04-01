const {
  resolve, relative, posix, parse, normalize, join, format,
  extname, dirname, delimiter, basename,
} = require('path')
const expose = require('expose-hidden')
const glob = require('./glob')()
const promise = require('./promise')
const extra = require('./extra')
const flipfile = require('./index.js')

// everything from path as flat
let ex = {
  resolve,
  relative,
  posix,
  parse,
  normalize,
  join,
  format,
  extname,
  dirname,
  delimiter,
  basename,
}

// export everything from extra as well
expose(extra)
for (const fn in extra) {
  ex[fn] = extra[fn]
}


ex = Object.assign(ex, flipfile)

module.exports = Object.assign(ex, {glob, promise, extra})
