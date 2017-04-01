const ChainedMap = require('flipchain/ChainedMapExtendable')
const execa = require('execa')
const log = require('fliplog')
const Scripts = require('./Scripts')
const binner = require('./binner')

/**
 * @TODO:
 * - [ ] pipe (|),
 * - [ ] then (&&)
 *
 * @core
 *
 * @example input
 *  scripts
 *   .add()
 *   .npm('diggy')
 *   .env('magic')
 *   .flag('env.zoolala', 'aoao')
 *   .arg('-e')
 *
 * @example output
 * `${env} ${lerna} exec ${lernaLog} ${scoped} -- node ${binPath}`
 */
module.exports = class ScriptFlip extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.extend(['debug'])
    this.debug(true)
    this.scripts = new Scripts(this)
  }

  /**
   * @inheritdoc Scripts.add
   */
  add(name) {
    return this.scripts.add(name)
  }

  /**
   * @inheritdoc Scripts.toString
   */
  toString() {
    return this.scripts.toString()
  }

  /**
   * @inheritdoc Scripts.toCmd
   */
  toCmd() {
    return this.scripts.toCmd()
  }

  /**
   * @see this.toCmd
   * @return {Promise.all}
   */
  run() {
    // https://github.com/nodejs/node-v0.x-archive/issues/5841#issuecomment-249355832
    const cmds = this.toCmd()

    log
      .data(cmds)
      .text('ScriptFlip.run: .toCmd()')
      .echo(this.get('debug'))

    const promises = cmds.map(cmd => {
      const {bin, args, env} = cmd
      const cwd = process.cwd()
      const isBinnable = binner.isBinnable(bin)
      const preferLocal = !!isBinnable

      log
        .data({isBinnable, env, cwd, preferLocal, args})
        .text('ScriptFlip.run:')
        .echo(this.get('debug'))

      const spawn = execa

      return spawn(bin, args, {env, cwd, preferLocal})
      .then((result) => {
        log
          .data(result)
          .text('ScriptFlip.run: .result')
          .echo(this.get('debug'))

        console.log('-------')
        console.log('booya', result.stdout)
        return Promise.resolve(result)
      })
      .catch(log.catch)
    })

    return Promise.all(promises)
  }

  // --- todo ---
  // ops
  // run() {
  //   // 'node ' + this.parent.scripty.nodeModuleFor('cross-env') +
  //   // .forEach(env => {
  //   //   console.log(env)
  //   //   this.execWith({env, bin, localBin, scope})
  //   // })
  //
  //   this.scripts = []
  //   return this
  // }
  // exec() {
  //   const todo = Script
  //   this.scripts.forEach(script => {
  //     execa(...todo)
  //   })
  // }
  // cross_env(env) {return execa('cross-env', [`NODE_ENV=${env}`])}
}
