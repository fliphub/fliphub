const ChainedMap = require('flipchain/ChainedMapExtendable')
const execa = require('execa')
const log = require('fliplog')
const Scripts = require('./Scripts')
const binner = require('./binner')
const Remember = require('./Remember')

/**
 * @TODO:
 * - [ ] these require better `grouping` because groups are not just `--`
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

  /**
   * @since 0.0.6
   * @param {any} [parent]
   * @return {ScriptFlip}
   */
  static init(parent) {
    return new ScriptFlip(parent)
  }

  constructor(parent) {
    super(parent)

    this
      .extend(['debug', 'progress'])
      .debug(true)
      .progress(true)

    this.scripts = new Scripts(this)
    this.remember = new Remember(this)
  }

  /**
   * @see FlipScript.Program.parseEnv
   * @param {string} name
   * @param {string} value
   * @return {ScriptFlip}
   */
  env(name, value) {
    const env = Object.assign(this.get('env') || {}, {[name]: value})
    return this.set('env', env)
  }

  /**
   * @see Script.stdout
   * @param {string} [stdout]
   * @return {ScriptFlip}
   */
  stdout(stdout = 'inherit') {
    return this.set('stdout', stdout)
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
   * @since 0.0.3
   * @see this.toCmd
   * @return {Promise.all}
   */
  run() {
    // https://github.com/nodejs/node-v0.x-archive/issues/5841#issuecomment-249355832
    const cmds = this.toCmd()

    // log
    //   .data(cmds)
    //   .text('ScriptFlip.run: .toCmd()')
    //   .echo(this.get('debug'))

    let parentEnv = this.get('env')

    // should put this in a map.cmds fn to debug easier
    const promises = cmds.map(cmd => {
      let {bin, args, env, stdout} = cmd
      const cwd = process.cwd()
      const isBinnable = binner.isBinnable(bin)
      const preferLocal = !!isBinnable

      const spawn = execa
      const opts = {cwd, preferLocal}

      if (!env.NODE_ENV && parentEnv && parentEnv.NODE_ENV) {
        env.NODE_ENV = parentEnv.NODE_ENV
        env.PATH = process.env.PATH
      }
      if (env && Object.keys(env).length) {
        opts.env = env
      }

      if (!stdout && this.get('stdout')) stdout = this.get('stdout')
      if (stdout) opts.stdout = stdout
      if (stdout) opts.stdio = stdout

      // if last arg was `--` which we do not need
      if (args[args.length - 1] === '--') args.pop()
      if (args[args.length - 1] === '--') args.pop()


      log
        .data({isBinnable, args, opts, bin})
        .text('ScriptFlip.run:')
        .echo(this.get('debug'))


      // run Remember, use config for progress to enable/disable
      this.remember.start({bin, args, opts}, this.get('progress'))

      return spawn(bin, args, opts)
        .then((result) => {
          this.remember.finish({bin, args, opts}, result)

          log
            .data(result)
            .text('ScriptFlip.run: .result')
            .echo(this.get('debug'))

          if (stdout) console.log('stdout: ', result.stdout)

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
