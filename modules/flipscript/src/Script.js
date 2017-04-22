const ChainedMap = require('flipchain/ChainedMapExtendable')
const Flag = require('./Flag')
const {flipglob, insertAt, real, toarr, prefixer} = require('./deps')
// const binner = require('./binner')

// https://www.youtube.com/watch?v=SwSle66O5sU
const OFF = `${~315 >>> 3}@@`

/**
 * @config
 *
 * @TODO:
 * - [ ] need to change the `_` values to just `.set`
 * - [ ] needs some added index stuff such as adding raw commands
 *       example `exec`
 * - [ ] might need to make `groups` return a new Script?
 * - [ ] values without `=`, spaced
 *
 *
 *
 * ---
 * prefix app names, for monorepos
 *
 * if this is set,
 * then when we are done,
 * we mutate names
 *
 * ---
 *
 * this.flags: Array<Flag>
 * this.current = number / index of current Flag
 *
 * ---
 *
 * https://github.com/Unitech/pm2
 * globs, aliases, adding flags, getting the flags!
 * set envs, just don't pass them in if they are empty
 */
module.exports = class Script extends ChainedMap {
  constructor(parent) {
    super(parent)

    // already bound by parent
    this.run = this.parent.run

    this
      // might also want to do other things here with node, py, etc
      .extend([
        '_file', // ?str/path
        '_binDir',
        // 'current', // instanceof flag
        'prefix', // string
        'flagIndex',
        '_env',
        '_raw',

        '_bin', // str
        '_npm',
      ])
      // .extendIncrement([
      //   'index', // num
      // ])
      .extendTrue([
        // 'npm',
        'sync',
      ])

      // .index()

    this.i = 0
    this.file = (file, i = OFF) => this
      .addToGroup('node')
      .addToGroup(file)
      ._file(file)
    this.npm = (npm, i = OFF) => this
      .addToGroup('npm', 1)
      .addToGroup('run-script')
      .addToGroup(npm)
      ._npm(npm)
      .doubleDash('--')
    this.bin = (bin, i = OFF) => this
      .addToGroup(bin) // , 1
      ._bin(bin)
    this.raw = (raw, i = OFF) => this
      .addToGroup(raw) // , 1
      ._raw(this.get('_raw').concat([raw]))

    this.node = (harmony) => {
      this
      .addToGroup('node')
      if (harmony) {
        this
        .flag('harmony')
        .flag('max_old_space_size', 120000)
      }
    }

    // default
    this
      .flagIndex(OFF)
      ._env({}) // process.env
      ._binDir('../../')
      ._raw([])

    this.index = 0
    this.doubleDash = (arg) => {
      this.addToGroup(arg)
      return this.group(arg)
    }
    this.groups = [
      /* 0:*/ [],
    ]
  }

  /**
   * @param {string} [stdout]
   * @see execa
   * @return {Script}
   */
  stdout(stdout = 'inherit') {
    this.set('stdout', stdout)
    return this
  }

  // --- groups ---

  /**
   * @see this.groups
   * @return {Array<?Flag>}
   */
  currentGroup() {
    return this.groups[this.index]
  }

  /**
   * @see this.groups
   * @param {number} [index] if blank, goes to last
   * @return {Script}
   */
  goToGroup(index = null) {
    this.index = index
    if (this.index === null) this.index = this.groups.length - 1
    return this
  }

  /**
   * @see this.groups, this.index
   * @return {Script}
   */
  group() {
    this.groups.push([])
    this.index = this.groups.length - 1
    return this
  }

  /**
   * @description adds a flag to a specific group, defaults to current
   * @see this.current
   * @see this.groups
   * @param {Flag} flag
   * @param {number} [index]
   * @param {number} [group]
   * @return {Script}
   */
  addToGroup(flag, index = OFF, group = OFF) {
    if (group === OFF) {
      group = this.index
    }

    // if we specified an index to insert into,
    // use it, then reset it
    if (this.get('flagIndex') !== OFF) {
      index = this.get('flagIndex')
      this.flagIndex(OFF)
    }

    // if empty
    this.groups[group] = this.groups[group] || []

    if (index === OFF) {
      this.groups[group].push(flag)
      return this
    }

    this.groups[group] = insertAt(this.groups[group], index, toarr(flag))
    // this.index = group + 2

    return this
  }

  // --- flags ---

  /**
   * @extends this.addToGroup
   * @since 0.0.3
   * @private
   * @see this.current, this.flag, this.arg
   *
   * @param {number} [index]
   * @param {number} [group]
   * @return {Flag}
   */
  _addFlag(index = OFF, group = OFF) {
    this.current = new Flag(this)
    this.addToGroup(this.current, index, group)
    return this.current
  }

  /**
   * @since 0.0.3
   * @description
   * use `arg` for no `--`
   * if value === OFF, it is an arg with no value
   *
   * @see this.arg
   * @param {string} name
   * @param {string} [value]
   * @return {Script}
   */
  flag(name, value = OFF) {
    this.arg(name, value)
    this.current.dash('--')
    return this
  }

  /**
   * @since 0.0.3
   * @description
   * if value === OFF,
   * it is an arg with no value
   *
   * @see this.arg
   * @param {string} name
   * @param {string} [value]
   * @param {number} [index]
   * @param {number} [group]
   * @return {Script}
   */
  arg(name, value = OFF, index = OFF, group = OFF) {
    this._addFlag(index, group)
    this.current.name(name)
    if (value !== OFF) this.current.value(value)
    return this
  }

  // --- globs ---

  /**
   * @since 0.0.3
   * @param {string} name
   * @param {string | Array<string>} apps
   * @param {boolean | string} [dash]
   * @return {Flag}
   */
  globFlag(name, apps, dash = true) {
    // if (!real(apps)) return this
    const glob = flipglob.start().any(apps).toString()
    if (dash) return this.flag(name, glob)
    return this.arg(name, glob)
  }

  /**
   * @since 0.0.6
   * @param {string} name
   * @param {string | Array<string> | boolean} apps boolean when stringify
   * @param {boolean | string} [stringify]
   * @return {Flag}
   */
  globArg(name, apps, stringify = true) {
    // optional shorter args
    if ((typeof name === 'string' || Array.isArray(name)) && apps === false) {
      stringify = apps
      apps = name

      const glob = flipglob.start().any(apps).toString()
      const val = this.arg(glob)

      if (stringify === false) this.current.stringify(false)

      return val
    }

    const glob = flipglob.start().any(apps).toString()
    if (stringify === false) return this.arg(name, glob)
    return this.arg(name, glob)
  }


  /**
   * @since 0.0.3
   * @param {string} env
   * @param {string | Array<string>} apps
   * @return {Flag}
   */
  globEnv(env, apps) {
    if (!real(apps)) return this
    const glob = flipglob.start().any(apps).toString()
    return this.envDefine(glob, env)
  }

  /**
   * @since 0.0.3
   * @param {string} env
   * @param {string | Array<string>} apps
   * @param {Object} opts {dash: boolean, prefix: boolean}
   * @return {Flag}
   */
  globEnvAndFlag(env, apps, opts = {}) {
    const {dash, prefix} = Object.assign({dash: true, prefix: false}, opts)

    if (prefix) apps = prefixer(this.get('prefix') || prefix, apps)

    return this
      .globEnv(env, apps)
      .globFlag(env, apps, dash)
  }

  // --- env ---

  /**
   * @since 0.0.3
   * @param {string<production, development, any>} env
   * @return {Flag}
   */
  envArg(env) {
    this.arg('NODE_ENV', env) // , 0, 0
    return this
  }

  /**
   * @NOTE: does not mutate process.env,
   *        creates a copy of it for child_processes
   * @description to pass along to child_processes
   * @since 0.0.3
   * @see this._env, process.env, execa, child_process
   *
   * @see http://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js
   *
   * @param {string<production, development, any>} env
   * @param {string} prop
   * @return {Flag}
   */
  envDefine(env, prop = 'NODE_ENV') {
    const _env = Object.create(process.env)
    _env[prop] = env
    _env.PATH = process.env.PATH

    const existing = this.get('_env')
    if (existing) return this.set('_env', Object.assign(existing, _env))

    return this._env(_env)
  }

  /**
   * @see this.envDefine, this.envArg
   * @since 0.0.3
   * @param {string<production, development, any>} env
   * @return {Flag}
   */
  env(env) {
    return this
      .envDefine(env)
      // .envArg(env)
  }

  /**
   * does both
   *
   * @see this.env, this.envDefine
   * @param {string} env
   * @return {Scripts}
   */
  envs(env) {
    return this
      .envDefine(env)
      .envArg(env)
  }

  /**
   * @since 0.0.3
   * @description returns to Scripts to add a new Script
   * @param {string} name
   * @return {Scripts}
   */
  add(name) {
    return this.parent.add(name)
  }

  // --- presets ---

  /**
   * @TODO: add real presets eh
   *
   * @TODO: !!!!!!!!!!
   * need to make the .binPath and such get used with node with lerna
   * !!!!!!!!!!
   *
   *
   * @return {Script}
   */
  lerna() {
    this.log = (level = 'info') => {
      this.flag('loglevel', level)
      return this
    }
    this.lernaEnv = (env) => {
      return this
        .goToGroup(0)
        .flagIndex(0)
        .env(env)
    }
    this.scope = (scope) => {
      if (!scope) return this

      const prefix = this.get('prefix')
      if (prefix) scope = prefixer(prefix, scope)

      return this
        .globFlag('scope', scope, '--')
    }

    return this
      .bin('lerna')
      .extend(['concurrency']) // num
  }

  /**
   * for use in execa
   * @param {boolean} [reduce] return as joined (should move to toStr)
   * @return {Array<string>}
   */
  toArray(reduce = false) {
    const {
      _bin, binDir, file, npm, _env,
      prefix,
      // sync, exec, fork
    } = this.entries()

    // console.log(this.groups)
    let flags = this.groups.map((group, i) => {
      // console.log(group, i)
      // group.forEach(g => log.verbose(5).data(g).bold('-----------=====').echo())
      let mapped = toarr(group)
        .filter(g => g)
        .map(flag => flag.toString(prefix) + ' ')
      // console.log({mapped})
      if (reduce) mapped = mapped.join(' ')
      return mapped
    })

    // if (reduce) flags = flags.join(' -- ')

    // const last = flags.length - 1
    // flags[last] = flags[last].replace(/\s\s/, ' ').slice(0, -3)

    return flags
    // let script = []
    // // if (file) script = script.concat(['node', file])
    // // else if (bin) script.unshift(bin)
    // // else if (npm) script = script.concat(['npm', 'run', npm])
    //
    // // script = script.concat(flags)
    // script.push(flags)
    //
    // // console.log(script)
    // // log.verbose(5).data(script).bold('-----------=====').echo()
    // // this seems nasty
    // // script.env = _env
    //
    // return script
  }

  /**
   * @since 0.0.3
   * @return {string}
   */
  toString() {
    return this.toArray(true).join(' -- ').replace(/\s{2}/gmi, ' ').trim()
      // .map(group => group.join('###'))
      // .join(' -- ')
      // .replace(/ {2}/, ' ').trim()
  }

  /**
   * @since 0.0.3
   * @return {Object}
   */
  toCmd() {
    const arr = this.toArray()
    const stdout = this.get('stdout')

    // take group out,
    const group1 = arr.shift()
    // take first of group 1 out,
    const bin = group1.shift().trim()
    // then put group 1 back in
    arr.unshift(group1)

    // flatten
    const args = []
    arr.forEach(arg => {
      if (Array.isArray(arg)) return arg.forEach(a => args.push(a.trim()))
      return args.push(arg.trim())
    })

    // {isBin: _bin} = this.entries()
    const cmds = {bin, args, env: this.get('_env')}
    if (stdout) cmds.stdout = stdout
    return cmds
  }

  // ---
  // clone and extend an existing script
  // to do things like extend a script but another env... simplicity
  // extend() {}, inherit() {}
}
