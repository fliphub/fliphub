var fsbx = require('fuse-box')

class JavaScriptToTypeScriptPlugin {
  constructor(options) {
    this.test = /.js$/
    this.helpers = options.helpers
    this.babelPlugin = options.babelPlugin
    // this.webworkerPaths = []
    console.log('added test prop')
  }

  // https://github.com/bjyoungblood/webworker-loader
  init(context) {
    if (this.debug)
      console.debug('initted')
    this.context = context
  }
  // loadIfNeeded(file) {
  //   file.loadContents()
  //   file.analysis.parseUsingAcorn()
  //   file.analysis.analyze()
  //
  //   if (!file.analysis.ast) {
  //     // file.analysis.parseUsingAcorn()
  //     // file.analysis.analyze()
  //   }
  // }

  transform(file) {
    // var path = file.contents.match(/\s+require\('([^']+)'\);?/)
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

    this.babelPlugin.transform(file)

    var outFile = this.helpers.resolve(`./ts/${file.info.fuseBoxPath.replace('.js', '.ts')}`)
    console.log(file.info.fuseBoxPath)
    var params = {
      debug: true,
      log: true,
      cache: true,
      package: file.info.fuseBoxPath,
      globals: {[file.info.fuseBoxPath]: '*'},
      plugins: [
        this.babelPlugin,
      ],
      // homeDir: resolve('./'),
      homeDir: this.helpers.resolve('./'),
      outFile,
    }

    console.log(params)
    fsbx.FuseBox
      .init(params)
      .bundle(`>${file.info.fuseBoxPath}`)


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

// var jsts = new JavaScriptToTypeScriptPlugin()
// module.exports = jsts
module.exports = JavaScriptToTypeScriptPlugin
