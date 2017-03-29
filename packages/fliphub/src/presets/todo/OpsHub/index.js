const Ops = {
  decorate() {
    let flag = this.helpers.flags.searchAll
    let shouldTest = flag('test', {type: 'bool'})
    let shouldRun = flag('run')
    let shouldCompile = flag('compile')
    let shouldExec = flag('exec')
    let shouldClean = flag('clean')
    this.builtApps.forEach(app => {
      if (app.test || app.tests) shouldTest = true
      if (app.run) shouldRun = true
      if (app.compile) shouldCompile = true
      if (app.exec) shouldExec = true
      if (app.fused) this.helpers.fuseCommander(app, this.helpers)
      // if (app.cache === false || app.fuser) shouldClean = true
    })
    this.helpers.log({
      shouldTest,
      shouldRun,
      shouldCompile,
      shouldExec,
      shouldClean,
    }, '━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)" fullAuto')
  },
}

module.exports = Ops
