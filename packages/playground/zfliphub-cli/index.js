const Commanderer = require('./Commanderer')
// const PackageScripts = require('./PackageScripts')
// const ScriptPermutator = require('./ScriptPermutator')
const Presets = require('./Presets')
const program = require('commander')
const inquirer = require('inquirer')
const PackageManager = require('./PackageManager')
const {
  Scripty, LernaCli, Filterer,
  envrmts, execSyncStd,
} = require('./Scripty')

const {
  read, write, tryJSON, path, fs, deep, inspect,
} = require('./helpers')

// take in commander, or export commander and inquirer
// take in dir, to resolve paths
//
// import everything
class FlipHubCli {
  constructor(root, defaultScope = '*', name = '/flip.js') {
    deep.root = root
    this.defaultScope = defaultScope
    this.flipper = root + name
    this.program = program
    this.filterer = new Filterer(this)
    this.lerna = new LernaCli(this)
    this.presets = new Presets(this)
    this.scripty = new Scripty(this)
    this.cmdr = new Commanderer(this)
    this.cmdr.allHelp()
    this.execSync = execSyncStd
    this.pkgmngr = new PackageManager()
    this.pkgmngr.addToGitIgnore('.fliphub')
  }

  runScriptFor(name, cmd, args) {
    return this.scripty.runScriptFor({name, cmd, args})
  }
  runScriptForBin(name, cmd, args) {
    return this.scripty.runScriptForBin({name, cmd, args})
  }

  globScope(scopes, cmd) {
    return this.filterer.scope(scopes)
  }
  envScope(env, scopes) {
    return this.filterer.envScope(env, scopes)
  }
  runScoped({envs, bin, log, scope}) {

  }

  // handle(opts) {
  //   this.flagKeys = Object.keys(opts)
  //   this.flags = opts
  // }
}

module.exports = {
  FlipHubCli,
  program,
  inquirer,

  deep, envrmts, execSyncStd,
  Filterer, LernaCli, Scripty,
}
