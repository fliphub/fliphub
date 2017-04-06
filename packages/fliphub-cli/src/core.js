const Commanderer = require('./Commanderer')
const Presets = require('./Presets')
const program = require('commander')
const inquirer = require('inquirer')
const PackageManager = require('./PackageManager')
const LernaCli = require('./LernaCli')
const Filterer = require('./Filterer')
const {
  Scripty,
  envrmts, execSyncStd,
} = require('flipscript')
const {
  read, write, tryJSON, path, fs, deep, inspect,
} = require('./helpers')

const argv = require('minimist')(process.argv.slice(2))

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

  runScriptFor(name, cmd, flags) {
    return this.scripty.runScriptFor({name, cmd, flags})
  }
  runScriptForBin(name, cmd, flags) {
    return this.scripty.runScriptForBin({name, cmd, flags})
  }
  runNodeForModule(name, cmd, {flags, env}) {
    return this.scripty.runNodeForModule({name, cmd, flags, env})
  }

  toGlob(scopes, cmd) {
    return this.filterer.toGlob(scopes)
  }
  globFlag(scopes, cmd) {
    return this.filterer.globFlag(scopes)
  }
  globScope(scopes, cmd) {
    return this.filterer.scope(scopes)
  }
  envScope(env, scopes) {
    return this.filterer.envScope(env, scopes)
  }
  defineEnv(env, val) {
    return this.filterer.defineEnv(env, val)
  }

  // runScoped({envs, bin, log, scope}) {}
}

module.exports = {
  argv,
  FlipHubCli,
  program,
  inquirer,
  read,
  write,
  tryJSON,
  path,
  fs,
  inspect,
  deep,
  envrmts,
  execSyncStd,
  Filterer,
  LernaCli,
  Scripty,
}
