function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}
function esc(str) {
  return str.replace(/[\\]/g, '\\$&')
}
class AliasPlugin {
  constructor(options) {
    this.test = /.js$/
    this.helpers = options.helpers
    this.aliases = options.aliases
    this.aliasKeys = Object.keys(options.aliases)
    this.keys = this.aliasKeys.map(key => escapeRegExp(key))
    // this.keys = [this.keys[0], this.keys[1], this.keys[2]]
    this.matches = this.keys.join('|')
    this.babelPlugin = options.babelPlugin
    // this.matches = this.matches.split(this.matches.length - 3).pop()
    // console.log(options.aliases)
    // console.log(this.keys)
    // console.log(this.matches)

    this.matched = []
    // this.webworkerPaths = []
    console.log('added test prop')

    this.reqStr = this.makeReqStr(this.matches)
    this.impStr = this.makeImpStr(this.matches)
    this.reqReg = new RegExp(this.reqStr, 'gm')
    this.impReq = new RegExp(this.impStr, 'gm')
  }

  // https://github.com/bjyoungblood/webworker-loader
  init(context) {
    // if (this.debug)
    console.log('initted________')
    this.context = context
  }
  loadIfNeeded(file) {
    file.loadContents()
    // file.analysis.parseUsingAcorn()
    // file.analysis.analyze()

    if (!file.analysis.ast) {
      // file.analysis.parseUsingAcorn()
      // file.analysis.analyze()
    }
  }

  makeReqStr(matches) {
    var str = ``
      + (`(?:\\s*require\\(['|"]*)`)
      // + esc(`(?:\s+require\([\'|\"])(`)
      + `(${matches})`
      // + esc(`)(?:[\'|\"]\);?))`)
      + (`(?:['|"]\\)?)`)
    return str
  }

  makeImpStr(matches) {
    var impStr = ``
      + (`(?:import[a-z0-1A-Z\\s]*from\\s*['|"])`)
      + `(${matches})`
      + (`(?:['|"];?)`)
    return impStr
  }

  transform(file, ast) {
    console.log('transform_______')
    file.loadContents()

    // (\s+require\([\'|\"](ds-nj-inletRegistry)[\'|\"]\);?)
    // (\s+require\([\'|\"](ds-nj-inletRegistry)[\'|\"]\);?)
    // var importRegx = (?:import[a-z0-1A-Z\s]*from\s*[\'|\"])(eh)(?:[\'\"];?)
    // console.log()
    // file.analysis.requiresRegeneration = true

    var imps = file.contents.match(this.impReq)
    var reqs = file.contents.match(this.reqReg)
    // console.log(this.impReq)
    // console.log(this.reqReg)
    // console.log(reqs)
    // console.log(imps)
    if (imps) {
      // console.log('IMPS')

      // this.matched.push(imps[1])
      // file.contents = file.contents.replace()
      imps.forEach(imp => this.aliasKeys.forEach(key => {
        var alias = this.aliases[key]
        // console.log(key)
        var resolved = this.helpers.path().relative(file.info.absPath, alias)
        this.helpers.log.text(resolved)
        var keyRep = `require('${key}')`
        var aliasRep = `require('${alias}')`
        file.contents = file.contents.replace(keyRep, aliasRep)
      }))

      // console.log(imps)
      // console.log(file.contents)
      // process.exit(0)
    }
    if (reqs) {
      // console.log('REQS')
      // this.matched.push(reqs[1])
      // console.log(reqs)
      reqs.forEach(req => this.aliasKeys.forEach(key => {
        var alias = this.aliases[key]
        // console.log(key)
        var resolved = this.helpers.path().relative(file.info.absPath, alias)
        this.helpers.log.text(resolved)
        var keyRep = `require('${key}')`
        var aliasRep = `require('${alias}')`
        file.contents = file.contents.replace(keyRep, aliasRep)
      }))

      // console.log(file.contents)
      // process.exit(0)
    }

    // if (!this.initted) {
    //   this.babelPlugin.init(this.context)
    //   this.initted = true
    // }

    // console.log(this.babelPlugin)
    // process.exit(0)s
    // this.babelPlugin.transform(file, ast)


    // const has = this.webworkerPaths.filter((p) => {
    //   const ps = (p.includes('/') ? p.split('/') : [null, p]).pop()
    //   return file.info.absPath.includes(ps)
    // }).length
    //
    // var webworkerPath = path ? path[1] : false
    // if (webworkerPath && !this.webworkerPaths.includes(webworkerPath))
    //   return this.webworkerPaths.push(webworkerPath)

    // if (!has) return

    // file.info.fuseBoxPath
    // console.log(file.info.absPath)
    // console.log('..........')
    // console.log(file)

    // load & do parsing if it hasn't been done yet
    // if babel has been used, it will have been
    // this.loadIfNeeded(file)
    // try {
    //   file.info.absPath = file.info.absPath.replace('.js', '.ts')
    //   file.info.fuseBoxPath = file.info.fuseBoxPath.replace('.js', '.ts')
    // } catch (e) {
    //   // console.log(e)
    // }
    // file.collection.pm.context.tsMode = true
    // // console.log(file.collection.pm.context.tsMode)
    // this.loadIfNeeded(file)

    // flush / reset dependencies
    // so it will not include this file in the bundle
    // file.analysis.dependencies = []

    // rewrite this file to point to the actual output chunk
    // file.contents = `module.exports = new WebWorker(${webworkerOut})`


    // console.log(file.info, file.info.fuseboxPath)
    // var webworkerOut = resolve('./src/webworker/dist/code.webworker.js')
    // this.loadIfNeeded(file)

    // flush / reset dependencies
    // so it will not include this file in the bundle
    // file.analysis.dependencies = []

    // rewrite this file to point to the actual output chunk
    // file.contents = `module.exports = new WebWorker(${webworkerOut})`
  }
}

module.exports = AliasPlugin
