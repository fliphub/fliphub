const ChainedMapExtendable = require('./ChainedMapExtendable')

function flat(paths) {
  if (paths[0] && !paths[1] && Array.isArray(paths[0])) paths = paths[0]
  return paths
}

class Fluent extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.bundled = {}
    this.entry = this.startBundle = this.start.bind(this)
    // this.end = this.finish
  }
  reset() {
    this.bundled = {}
    return this
  }
  start(name) {
    this.bundled[name] = new FluentChain(name, this)
    return this.bundled[name]
  }
  toInstructions() {
    const keys = Object.keys(this.bundled)
    let instructions = {}
    if (keys.length > 1) {
      keys.forEach(key => {
        const instruction = this.bundled[key]
        instructions[key] = instruction.toConfig()
      })
    }
    else {
      instructions = this.bundled[keys[0]].toConfig()
    }
    return instructions
  }
}


// @TODO: what if things need to be in a particular order and you're using raw...
class FluentChain extends ChainedMapExtendable {
  constructor(name, parent) {
    super(parent)
    this.name = name
    this._include = new Set()
    this._exclude = new Set()
    this.raw = ''
    this.extendTrue([
      'cache', 'api', 'vendor',
    ])
    this.extendBool(['cache', 'api', 'vendor'], true)
    this.extend(['execute'])
    this.noDeps = this.ignoreDeps = this.excludeDeps = () =>
      this.set('_noDeps', true)
    // this.deps = (deps = true) => this.set('_noDeps', !deps)
    this.includeDeps = () => this.set('_noDeps', false)
    this.onlyDeps = this.vendor = (vendor = true) => this.set('vendor', vendor)

    this.ignore = this.exclude
    this.add = this.include
    this.entry = this.parent.entry
    this.endInstruct = () => this.parent.parent
  }
  finish() {
    return this.parent.parent
  }
  and(cmd) {
    this.raw += cmd
    return this
  }
  include(...paths) {
    flat(paths).forEach(path => this._include.add(path))
    return this
  }
  exclude(...paths) {
    flat(paths).forEach(path => this._exclude.add(path))
    return this
  }


  // shorthand
  noCache() {
    return this.api(false)
  }
  noApi() {
    return this.set('api', false)
  }

  toConfig() {
    const no = this.get('_noDeps')
    const execute = this.get('execute')

    const include = [...this._include.values()]
    const exclude = [...this._exclude.values()]

    const api = this.get('api') ? '!' : ''
    const cache = this.get('cache') ? '^' : ''
    const vendor = this.get('vendor') ? '~' : ''
    const rollup = this.get('rollup') ? '%' : ''
    let instruction = `${api}${vendor}${cache}${rollup}`

    if (execute) instruction += `\n >`
    if (execute && no) instruction += `[${execute}]`
    else if (execute) instruction += `${execute}`

    if (include) instruction += `\n` + include.map(inc => ' +' + inc).join('')
    if (exclude) instruction += `\n` + exclude.map(ex => ' -' + ex).join('')

    if (this.raw) instruction += this.raw

    return instruction
  }

  // test(test) {
  //   return this.set('test', test)
  // }
}

module.exports = {Fluent, FluentChain}
