const cwd = process.cwd()
const {execSync} = require('child_process')
const Chainable = require('flipchain/Chainable')
const inspect = require('inspector-gadget/inspect')

const execSyncStd = (cmd) => {
  let env = Object.create(process.env)
  const filtered = {
    NODE_ENV: env.NODE_ENV,
    BENCH_FILTER: env.BENCH_FILTER,
    PKG_FILTER: env.PKG_FILTER,
  }
  // console.log(inspect(filtered))
  console.log(inspect(cmd))

  // should pass in the current set node_env regardless of system
  return execSync(cmd, {stdio: 'inherit', cwd, env})
}
const execSyncSilent = (cmd) => {
  let env = Object.create(process.env)
  const filtered = {
    NODE_ENV: env.NODE_ENV,
    BENCH_FILTER: env.BENCH_FILTER,
    PKG_FILTER: env.PKG_FILTER,
  }
  // console.log(inspect(filtered))
  console.log(inspect(cmd))
  // should pass in the current set node_env regardless of system
  return execSync(cmd, {stdio: 'inherit', cwd, env})
  // return execSync(cmd, {cwd, env})
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
    let script = this.scriptFor({name, flags}) + cmd

    // if we error, prefix with node
    try {
      const ran = execSyncSilent(script)
      console.log(ran)
      return ran
    } catch (e) {
      try {
        script = ' node ' + script
        const ran = execSyncStd(script)
        return ran
      } catch (e) {
        console.log(e)
      }
    }
  }

  runNodeForModule({name, cmd, flags, env}) {
    const script = (env || '') + ' node '  + this.binFor(name) + `${cmd} ${flags || ''}`
    return execSyncStd(script)
  }

  runScriptForBin({name, cmd, flags}) {
    const script = this.scriptForBin({name, flags}) + cmd
    return execSyncStd(script)
  }
}

const envrmts = {
  browser: Scripty.node_env('browser'),
  dev: Scripty.node_env('development'),
  prod: Scripty.node_env('production'),
}

module.exports = {
  Scripty,
  envrmts,
  execSyncStd,
}
