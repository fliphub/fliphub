const fileUtil = require('../../lib/file')
const path = require('path')
const {isAbsolute} = path
const {isFile, isDir, isRel} = fileUtil
let utils = {}

// @TODO:
// array of file entries
// deal with chunks better
// deal with no output file...
// deal with WHETHER IT SHOULD BE RELATIVE OR NOT
// MAP .CONTEXT
//
// if (!isFile(file)) file = utils.resolve('./dist'),
//
// make it handle 1 file just as helper

class PathMaster {
  // configOut, webpack params
  constructor({helpers, context}) {
    utils = helpers

    // conflicted about this one
    this.workspace = {
      homeDir: false,
    }
    this.in = {
      // file: false,
      // dir: false,
      // abs: false,
      // rel: false,
      // fileType: false,
      // aliasDir: false,
      // homeToEntry: false,

      // config: String, // for compat?
      // instructions: false, // ?
    }
    this.out = {
      // file: false,
      // dir: false,
      // abs: false,
      // rel: false,
      //
      // // files are accessible relatively with this path
      // publicPath: '/',
      //
      // config: false,
      // libraryTarget, homeToDir, rel
    }
  }

  // public \/
  outFileName() { return this.out.file }
  outFile() { return this.out.abs }
  outDir() { return this.out.dir }
  entry() { return this.in.abs }
  homeDir() { return this.workspace.homeDir }

  static resolveDeep(object, helpers) {
    helpers.deepReplaceTest(object, isRel, null, ({val, obj, prop}) => {
      obj[prop] = helpers.resolve(val)
    })
    return object
  }

  // private \/

  // @NOTE: is from webpack
  // getOutputPath / getOutputFile
  //
  // outFile:
  // - use
  //
  // path:
  //  - use
  //  - fallback: ./dist
  // filename:
  //  - use
  //  - fallback: app.name.js
  getOut(app) {
    if (app.outFile) return app.outFile
    const pathname = app.path || './dist'
    const filename = app.filename || app.name + '.js'
    return pathname + '/' + filename
  }

  // @TODO: more support
  // if (!filename.includes('.js')) filename += `.js`
  getFileAndPath(file) {
    const split = file.split('/')
    const fileAndPath = {
      file: split.pop(),
      path: split.join('/'),
    }

    fileAndPath.dir = fileAndPath.path
    return fileAndPath
  }


  // @TODO: special case webpack and fusebox?! instructions?!
  // ^ instructions will be split into externals and includes
  handleIn(app) {
    // this.contextDir = entry
    this.in.rel = app.entry
    this.in.abs = utils.resolve(this.in.rel)

    const {file, dir} = this.getFileAndPath(app.entry)
    this.in.file = file
    this.in.dir = dir

    if (this.in.file) this.fileType = this.in.file.split('.').pop()
    // console.log('handle in', this)

    this.in.homeToEntry = utils
      .path()
      .relative(this.workspace.homeDir, this.in.abs)

    return this
  }

  handleOut(app) {
    // raw
    this.out.raw = app.output

    // absolute
    this.out.rel = this.getOut(app)
    this.out.abs = utils.resolve(this.out.rel)

    // small pieces
    let {file, dir} = fileUtil.getFileAndPath(this.out.abs)

    // @TODO: console warn validation ~autoguessfix
    if (!isDir(dir)) dir = utils.resolve('./dist')

    this.out.dir = dir
    this.out.file = file
    return this
  }

  // use homeDir if we have it, or use root
  handleWorkSpace(app) {
    this.workspace.homeDir = app.homeDir || utils.resolve.root
    return this
  }

  // @chainable
  handle(app) {
    this.handleWorkSpace(app)
    this.handleIn(app)
    this.handleOut(app)
    return this
  }
}

module.exports = PathMaster
