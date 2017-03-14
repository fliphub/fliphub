var fsbx = require('fuse-box')

class WebWorkerPlugin {
  constructor(options) {
    this.test = /(.*)/
    this.webworkerPaths = []
    console.log('added test prop')
  }

  // https://github.com/bjyoungblood/webworker-loader
  init(context) {
    if (this.debug)
      console.debug('initted')
    this.context = context
  }
  loadIfNeeded(file) {
    file.loadContents()
    file.analysis.parseUsingAcorn()
    file.analysis.analyze()
  }

  transform(file) {
    var path = file.contents.match(/\s+require\('([^']+)'\);?/)
    const has = this.webworkerPaths.filter((p) => {
      const ps = (p.includes('/') ? p.split('/') : [null, p]).pop()
      return file.info.absPath.includes(ps)
    }).length

    var webworkerPath = path ? path[1] : false
    if (webworkerPath && !this.webworkerPaths.includes(webworkerPath))
      return this.webworkerPaths.push(webworkerPath)

    if (!has) return

    // file.info.fuseBoxPath
    console.log(file.info.absPath, this.webworkerPaths)
    console.log('..........')

    // load & do parsing if it hasn't been done yet
    // if babel has been used, it will have been
    this.loadIfNeeded(file)

    var webworkerOut = resolve('./src/webworker/dist/code.webworker.js')

    // flush / reset dependencies
    // so it will not include this file in the bundle
    file.analysis.dependencies = []

    // rewrite this file to point to the actual output chunk
    file.contents = `module.exports = new WebWorker(${webworkerOut})`

    fsbx.FuseBox
      .init({
        debug: true,
        cache: false,
        homeDir: resolve('./'),
        outFile: webworkerOut,
      })
      .bundle(`>${file.info.fuseBoxPath}`)
  }
}

var worker = new WebWorkerPlugin()
worker.test = /(.*)/

var params = {
  debug: true,
  cache: false,
  homeDir: resolve('./'),
  outFile: resolve('./src/webworker/dist/ww.js'),
  plugins: [
    worker,
  ],
}
var fuse = new fsbx.FuseBox(params)
fuse.bundle('>/src/webworker/index.js src/**/webworker/*.js')
