const cwd = process.cwd()
const {execSync, spawnSync} = require('child_process')
const Chainable = require('./chain/Chainable')
const inspect = require('./inspect')
const execSyncStd = (cmd) => {
  console.log(inspect(cmd))

  // should pass in the current set node_env regardless of system
  return execSync(cmd, {stdio: 'inherit', cwd, env: process.env})
}

class Scripty extends Chainable {
  nodeModuleFor(node_module) {
    let resolved = require.resolve(node_module)
    if (resolved) return resolved
  }
  binFor(node_module) {
    // exec in child_process, capture the buffer output, assign to var
    const npmBin = this.npmBin ||
      execSync('npm bin').toString().replace(/\n/gmi, '')

    return npmBin + '/' + node_module
  }
  static node_env(env) {
    // const cross_env = 'cross-env'
    // const cross_env = binFor(`cross-env`)
    const cross_env = ''
    return `${cross_env} NODE_ENV=${env}`
  }

  envFor(name, val) {

  }
  cmdFor({cmd, flags, env}) {
    const nodeFlags = ' --harmony --max_old_space_size=8000'
    const script = `${env} ${cmd} ${flags}`
    return script
  }
  scriptFor({name, cmd, flags, env}) {
    return this.cmdFor({
      env: env || '',
      cmd: this.nodeModuleFor(name),
      flags: flags || '',
    })
  }
  scriptForBin({name, cmd, flags, env}) {
    return this.cmdFor({
      env: env || '',
      cmd: this.binFor(name),
      flags: flags || '',
    })
  }
  runScriptFor({name, cmd, flags}) {
    const script = this.scriptFor({name, flags}) + cmd
    console.log(inspect(script))
    return execSyncStd(script)
  }
  runScriptForBin({name, cmd, flags}) {
    const script = this.scriptForBin({name, flags}) + cmd
    console.log(inspect(script))
    return execSyncStd(script)
  }
}

class Filterer extends Chainable {
  flagFor(name, val) {
    return `--${name}="${val}"`
  }
  prefixer(prefix, apps) {
    return apps.map(name => {
      if (!name.includes(prefix))name = prefix + '-' + name
      return name
    })
  }
  toGlob(apps) {
    return '+(' + apps.join('|') + ')'
  }
  globFlag(prefix, apps) {
    apps = apps.split(',')
    apps = this.prefixer(prefix, apps)
    apps = this.toGlob(apps)
    return apps
  }
  envScope(envName, apps, prefix = 'inferno') {
    return `${envName}="` + this.globFlag(prefix, apps) + '"'
  }
  // envVar(envName, val) {
  //   return `${envName}=` + val + ''
  // }
  scope(apps, prefix = 'inferno') {
    if (apps) {
      apps = this.globFlag(prefix, apps)
      const flag = this.flagFor('scope', apps)
      return flag
    }
    return ''
  }
}


class LernaCli extends Chainable {
  execWith({env, bin, localBin, log, scope}) {
    let renv = ''
    if (!env) env = ''
    else {
      env = ' NODE_ENV=' + env
      // renv = ' BUILD='+env
    }

    // to pass along to sub
    process.env.NODE_ENV = env

    let binPath = LernaCli.npmBinPath + bin
    if (bin.includes('rollup')) binPath = LernaCli.rootBin + bin

    // transform our options
    const lernaLog = log ? `--loglevel="${log}"` : '--loglevel=info'
    const lerna = this.parent.scripty.binFor('lerna')
    const scoped = this.parent.filterer.scope(scope)
    const eln = `${env} ${lerna} exec ${lernaLog} ${scoped} -- node ${binPath}`
    console.log(inspect(eln))

    // if (this.previousscript === eln)
    return execSyncStd(eln)
  }

  // `${lerna} exec ${lernaLog} ${scoped} -- ${tsc}`
  // ${envrmts.prod} ${lernad} exec ${lernaLog} ${scoped} -- node ${rollup}
  execFrom({options, bin, localBin, log, scope, envs}) {
    if (!envs) envs = ['production', 'browser', 'development']
    console.log(inspect({bin, log, scope}))

    envs.filter(env => {
      if (options[env]) return true
      return false
    })

    // 'node ' + this.parent.scripty.nodeModuleFor('cross-env') +
    .forEach(env => {
      console.log(env)
      this.execWith({env, bin, localBin, scope})
    })
    console.log(inspect('done!'))
  }
}
LernaCli.rootBin = '../../bin/'
LernaCli.upPath = '../../'
LernaCli.npmBinPath = '../../node_modules/.bin/'


const envrmts = {
  browser: Scripty.node_env('browser'),
  dev: Scripty.node_env('development'),
  prod: Scripty.node_env('production'),
}


module.exports = {
  Filterer, LernaCli, Scripty,
  envrmts,
  execSyncStd,
}
