// http://fredkschott.com/post/2014/06/require-and-the-module-system/
var Module = require('module')
var path = require('path')
var upUntil = require('./up-until')
var exists = require('flipfile/exists')
var read = require('flipfile/read')
var getDirs = require('flipfile/getDirectories')

let added = false
const paths = []

module.constructor.prototype.require =
Module.constructor.prototype.require =
function(requested) {
  var self = this
  console.assert(typeof requested === 'string', 'path must be a string')
  console.assert(requested, 'missing path')

  if (!added) {
    added = true
    const dir = upUntil({file: 'mahna'})
    let requirejs = exists(dir + '/mahna.json') ? JSON.parse(read(dir + '/mahna.json')) : ['packages']
    requirejs.forEach(js => {
      const resolved = path.resolve(dir, js)
      paths.unshift(resolved)
      if (exists(resolved + '/node_modules')) {
        paths.unshift(resolved + '/node_modules')
      }
      getDirs(resolved)
        .map(folder => path.resolve(resolved, folder) + '/node_modules')
        .filter(exists)
        .forEach(folder => paths.unshift(folder))
    })

    global.modulesDirectories = paths.map(str => str)
  }

  this.paths = this.paths.concat(paths)

  try {
    // console.log(this.paths)
    return self.constructor._load(requested, self)
  } catch (err) {
    throw err
    // if (err.code === 'MODULE_NOT_FOUND') {}
    // console.log(err)
    // if (!added) {
    //   const dir = upUntil({file: 'mahna'})
    //
    //   let requirejs = exists(dir + '/mahna.json') ? require(dir + '/mahna.json') : ['packages']
    //   requirejs.forEach(js => {
    //     const resolved = path.resolve(dir, js)
    //     this.paths.unshift(resolved)
    //     if (exists(resolved + '/node_modules')) {
    //       this.paths.unshift(resolved + '/node_modules')
    //     }
    //     getDirs(resolved)
    //       .map(folder => path.resolve(resolved, folder) + '/node_modules')
    //       .filter(exists)
    //       .forEach(folder => this.paths.unshift(folder))
    //   })
    //
    //   global.modulesDirectories = this.paths.slice(0)
    //   process.env.modulesDirectories = this.paths.slice(0)
    //   console.log(dir, requirejs, this)
    //   added = true
    //   return self.constructor._load(requested, self)
    // } else {
    //   throw err
    // }
  }
}
