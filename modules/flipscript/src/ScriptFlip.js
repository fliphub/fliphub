const ChainedMap = require('flipchain/ChainedMapExtendable')
const execa = require('execa')
const flipGlob = require('flipglob')
const insertAt = require('insert-at-index')
const real = require('izz/realNotEmpty')
const toarr = require('to-arr')
const {Hub, Workflow, Context, Core, log} = require('fliphub-core')

// https://www.youtube.com/watch?v=SwSle66O5sU
const OFF = `${~315 >>> 3}@@`

function prefixer(prefix, names) {
  return toarr(names).map(name => {
    if (!name.includes(prefix)) name = prefix + '-' + name
    return name
  })
}

class Flag extends Context {
  constructor(parent) {
    super(parent)
    this.dash = false
    this.stringify = false
    this.name = String
    this.value = undefined

    // so we can have groups by `--`
    // and index of flags
    // this.index = 0
    // this.group = 0
  }

  // @TODO:
  // - [ ] multiple prefixes later
  toString(prefix = false) {
    let string = ''

    // if dash: --
    // if prefix: (monorepo) e.g. (inferno-compat, lodash.forown)
    if (this.dash) string = '--'
    if (prefix) string += prefixer(prefix, this.name)
    else string += this.name

    // if value & stringify: --name='val', name='val'
    // else if value:        name=val,
    // else:                 --name, name
    if (real(this.value)) {
      if (this.stringify) string += `="${this.value}"`
      else string += `=${this.value}`
    }

    return string
  }
}

/**
 * @config
 *
 * @TODO:
 * - [ ] needs some added index stuff such as adding raw commands
 *       example `exec`
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
class Script extends ChainedMap {
  constructor(parent) {
    super(parent)

    this
      // might also want to do other things here with node, py, etc
      .extend([
        '_file', // ?str/path
        '_binDir',
        '_bin', // str
        // 'current', // instanceof flag
        'prefix', // string
        'flagIndex',
        '_env',
      ])
      // .extendIncrement([
      //   'index', // num
      // ])
      .extendTrue([
        '_npm',
        // 'npm',
        'sync',
      ])

      // .index()

    this.file = (file) => this
      .addToGroup('node')
      .addToGroup(file)
    this.npm = (npm) => this
      .addToGroup('npm', 1)
      .addToGroup('run')
      .addToGroup(npm)
      ._npm(npm)
    this.bin = (bin) => this
      .addToGroup(bin, 1)
      ._bin(bin)


    // default
    this
      .flagIndex(OFF)
      ._env({}) // process.env
      ._binDir('../../')

    this.index = 0
    this.doubleDash = this.group.bind(this)
    this.groups = [
      /* 0:*/ [],
    ]
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
   * @see this.groups
   * @return {Script}
   */
  group() {
    this.groups.push([])
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

    if (index === OFF) {
      this.groups[group].push(flag)
      return this
    }

    this.groups[group] = insertAt(this.groups[group], index, toarr(flag))
    this.index = this.groups.length - 1

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
    this.current.dash = '--'
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
    this.current.name = name
    if (value !== OFF) this.current.value = value
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
    const glob = flipGlob.start().any(apps).toString()
    if (dash) return this.flag(name, glob)
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
    const glob = flipGlob.start().any(apps).toString()
    return this.envDefine(name, glob)
  }

  /**
   * @since 0.0.3
   * @param {string} env
   * @param {string | Array<string>} apps
   * @param {boolean} [dash]
   * @return {Flag}
   */
  globEnvAndFlag(env, apps, dash = true) {
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
    this.arg('NODE_ENV', env, 0, 0)
    return this
  }

  /**
   * @NOTE: does not mutate process.env,
   *        creates a copy of it for child_processes
   * @description to pass along to child_processes
   * @since 0.0.3
   * @see this._env, process.env, execa, child_process
   *
   * @param {string<production, development, any>} env
   * @return {Flag}
   */
  envDefine(env) {
    const _env = Object.create(process.env)
    _env.NODE_ENV = env
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
      return this
        .globFlag('scope', scope, '--')
    }

    return this
      .bin('lerna')
      .extend(['concurrency']) // num
  }

  /**
   * for use in execa
   * @return {Array<string>}
   */
  toArray() {
    const {
      bin, binDir, file, npm, _env,
      prefix,
      // sync, exec, fork
    } = this.entries()
    const flags = this.groups.map(group =>
      group
        .filter(g => g)
        .map(flag => flag.toString(prefix) + ' ')
        .join('') // .join(' -- ')
    ).join('')

    let script = []
    if (file) script = script.concat(['node', file])
    else if (bin) script.unshift(bin)
    else if (npm) script = script.concat(['npm', 'run', npm])

    script = script.concat(flags)
    // this seems nasty
    // script.env = _env

    return script
  }

  /**
   * @since 0.0.3
   * @return {string}
   */
  toString() {
    const arr = this.toArray()
    console.log(arr)
    return '' // arr.join(' ')
  }

  // --- todos ---
  // presets() { const nodeFlags = ' --harmony --max_old_space_size=8000' }
  // doubleDash() {}
  // ---
  // clone and extend an existing script
  // to do things like extend a script but another env... simplicity
  // extend() {}, inherit() {}
}


// @workflow
class Scripts extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.index = -1
    this.scripts = {}
  }

  /**
   * @see this.scripts, Script
   * @description start/add/name a script
   * @param {string} [name]
   * @return {Script}
   */
  add(name = null) {
    this.index = this.index + 1
    if (name === null) name = this.index

    this.scripts[name] = new Script(this)
    this.current = this.scripts[name]
    return this.current
  }

  toString() {
    return Object
      .values(this.scripts)
      .map(script => script.toString())
      .join('')
  }

  // --- todo ---

  // also .addFlags for use outside of scripts?
  // add(name) {
  //   this.flags[name] = new Flag(this)
  //   this.index = this.index + 1
  //   return this.flags[name]
  // }
}

// @core
// @TODO: pipe, then (&&)
// `${env} ${lerna} exec ${lernaLog} ${scoped} -- node ${binPath}`
class ScriptFlip extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.scripts = new Scripts(this)
  }

  /**
   * @inherit Script.add
   */
  add(name) {
    return this.scripts.add(name)
  }

  cross_env(env) {
    return execa('cross-env', [`NODE_ENV=${env}`])
  }
  toString() {
    return this.scripts.toString()
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
}

const scripts = new ScriptFlip()
scripts
  .add()
  .env('prod')
  .lerna()
  .scope('app1,app2')
  .log('info')
  .concurrency(1)
  .group(2)
  .bin('tsc,rollup')
scripts
  .add()
  .bin('karma')
  .flag('only', 'me')
  .env('dev')
  .sync()
scripts
  .add()
  .npm('script')
  .env('magic')

log.quick(scripts.toString())


//   .envDefine('prod')
//   .envArg('prod')

  // .run('name')

//   .parent
// .exec()

// log.quick(scripts.toString())
// const data = log.json(log.stringify(scripts).returnVals()).echo()

//
// // .binPath('../../')
// // .nodeBinPath('../../node_modules/.bin/') // not needed


// log.quick(data)


// module.exports = LernaCli
