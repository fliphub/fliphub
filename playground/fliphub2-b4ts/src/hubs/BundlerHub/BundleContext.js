// https://webpack.js.org/configuration/entry-context/
// http://fuse-box.org/#home-directory

// https://webpack.js.org/guides/caching/#components/sidebar/sidebar.jsx
// http://fuse-box.org/#cache

// https://webpack.js.org/guides/code-splitting-import/

// ProjectContext would be Box context?

// const {PropParser} = require('fsbx/dist/commonjs/ArithmeticStringParser.js')
const PathMaster = require('./PathMaster')
const arrToObj = require('../../lib/helpers/arrToObj')
const childToParentMethods = require('../../lib/helpers/childToParentMethods')

// https://webpack.js.org/configuration/output/
class BundleRules {
  constructor() {
    this.rules = {}
    // this.ruleKeys = []
  }
  add(rule) {
    if (Array.isArray(rule)) rule = arrToObj(rule)
    else if (typeof rule === 'string') this.rules[rule] = rule
    if (typeof rule === 'object') this.rules = Object.assign(this.rules, rule)
    return this
  }
  all() { return this.rules }
  keys() { return Object.keys(this.rules) }
}
class Include extends BundleRules {}
class Exclude extends BundleRules {}

// maybe we could have `addAdapter`, then fusebox adds adapter, and webpack adds adapter
// BundleContext would be for multiple bundles with webpack or fusebox
class BundleContext {
  constructor(props) {
    this.chunk = props.chunk
    this.include = new Include()
    this.exclude = new Exclude()
    this.pm = new PathMaster(props)
    
    const handle = this.handle
    childToParentMethods({parent: this, child: this.pm})
    this.handle = handle
  }
  handle(bundle) {
    // console.exit(bundle)
    if (bundle.include) this.include.add(bundle.include)
    if (bundle.exclude) this.exclude.add(bundle.exclude)
    if (bundle.externals) this.exclude.add(bundle.externals)
    return this.pm.handle(bundle)
  }

  includes() { return this.include }
  excludes() { return this.exclude }
  includeKeys() { return this.include.keys() }
  excludeKeys() { return this.exclude.keys() }
  fileType() { return this.pm.in.fileType }
}

// if there is only one bundle,
// it's still an array to iterate in a unified manner
//
// @TODO: handle array...
class BundlesContext {
  constructor({helpers}) {
    this.helpers = helpers
    this.inspect = inspectorGadget(this, [
      '',
    ])

    // basic computed props
    // this.fileTypes = []
    this.pieces = []
    this._isChunks = false
  }
  fileTypes() {
    return this.pieces.map(bundle => bundle.fileType())
  }

  // get
  includeKeys() {
    return this.pieces.map(bundle => bundle.includeKeys())
  }
  excludeKeys() {
    return this.pieces.map(bundle => bundle.excludeKeys())
  }
  includeObj() {
    let includes = {}
    this.pieces.forEach(bundle =>
      includes = Object.assign(includes, bundle.includes()))
    return includes
  }
  excludeObj() {
    let excludes = {}
    this.pieces.forEach(bundle =>
      excludes = Object.assign(excludes, bundle.excludes()))
    return excludes
  }

  // when just 1 bundle
  isChunks() {
    return this._isChunks
  }

  // entryAsObj() {
  //   let entry = {}
  //   this.pieces.forEach(bundle => entry = Object.assign(entry, bundle.chunk))
  // }
  // fullOutput() {}

  asFull() {
    let full = this.full || {
      in: this.getBundle().in,
      out: this.getBundle().out,
    }
    return PathMaster.resolveDeep(full, this.helpers)
  }

  getBundle() {
    return this.pieces[0]
  }
  getPieces() {
    return this.pieces
  }
  // isPackage()

  add(bundle) {
    if (bundle.chunk) this._isChunks = true
    // this.fileTypes.push(bundle.fileType())
    this.pieces.push(bundle)
  }
}

module.exports = {BundleContext, BundlesContext}
