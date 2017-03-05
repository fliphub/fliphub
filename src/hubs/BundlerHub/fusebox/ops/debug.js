
function fuseboxCommander(app, helpers) {
  helpers.log(app.homeDir, 'homeDir')
  helpers.log(app.outFile, 'outFile')
  helpers.log(app.fusedConfig, 'fusedConfig')
  helpers.log(app.rootDir, 'rootDir')
  helpers.log(app.contextDir, 'contextDir')
  helpers.log(app.entry, 'entry')
  helpers.log(app.entryAbs, 'entryAbs')
  helpers.log(app.homeToEntry, 'homeToEntry')
  helpers.log(app.fusedConfig, 'instructions')
}

fuseboxCommander.compile = compile
fuseboxCommander.staticDevServer = staticDevServer
fuseboxCommander.exec = exec
fuseboxCommander.staticServerMiddleware = staticServerMiddleware
fuseboxCommander.coreDevServer = coreDevServer
