const Chainable = require('./chain/Chainable')
const inspect = require('./inspect')
const {execSyncStd} = require('./Scripty')

class LernaCli extends Chainable {
  execWith({env, bin, localBin, log, scope}) {
    if (!env) env = ''
    else env = ' NODE_ENV=' + env

    // to pass along to child_processes
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

module.exports = LernaCli
