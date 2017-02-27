// handles exclude/include

instructions = '>' + app.homeToEntry
if (app.arithmetics) instructions = app.arithmetics
app.fusedConfig = {
  instructions,
}
instructions = '>' + instructions
if (app.externals) {
  Object.keys(app.externals).forEach(external => instructions += ' -' + external)
}
