// @TODO: deal with relative better
// @TODO: resolve better & deal with multiple entries
// @TODO: add lib for split `/` pop and join
const FuseBoxConfig = {
  test: app => app.fusebox,
  decorate({app, helpers}) {
    var entry = app.entry
    app.contextDir = entry
    app.contextDir = app.contextDir.split('/')
    app.fileName = app.contextDir.pop()
    app.contextDir = app.contextDir.join('/')
    app.outFile = app.outFile ? helpers.resolve(app.outFile) : helpers.getOutputPath(app)
    app.rootDir = helpers.resolve.root
    app.homeDir = helpers.resolve.root
    app.entryAbs = helpers.resolve(app.entry)

    // app.rootDir.slice(app.entryAbs.indexOf(x))
    app.outFolder = app.outFile.slice(0).split('/')
    app.outFolder.pop()
    app.outFolder = app.outFolder.join('/')

    app.homeToEntry = helpers.path.relative(app.homeDir, app.entryAbs)
  },
}



// @TODO:
// - [ ] improve
// - [ ] check if last is /
// if it does not have a `.` it might not be a full entry point
if (typeof instructions === 'string' && !instructions.includes('.')) {
  instructions = instructions + '/index.js'
}

// @TODO: if last char is not already a `/`
app.rootDir = app.rootDir + '/'
app.homeDir = app.homeDir + '/'

app.outFileSourcemaps = app.outFileSourcemaps || helpers.resolve('./dist/sourcemaps.js.map')
app.configOut = app.configOut ? app.configOut : './dist/aliasConfig.js'
try {
  app._configOut = app.configOut
  app.configOut = helpers.resolve(app.configOut)
}
catch (e) {
  console.log(e)
}
