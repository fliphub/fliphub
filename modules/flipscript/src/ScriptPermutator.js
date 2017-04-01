function defaultMapFn(script) {
  return script
}

// from @challenger532 https://github.com/challenger532
class ScriptPermutator {
  constructor(ops) {
    const options = Object.assign({
      mapFn: defaultMapFn,
      env: ['dev', 'prod'],
      operations: [],
      apps: [],
      empty: [],
    }, ops)
    this.mapper = options.mapFn
    delete options.mapFn
    this.ops = options
    this.keys = Object.keys(this.ops)
    this.handleOptions()
  }

  // take the keys
  // prefix add___
  handleOptions() {
    this.keys.forEach(key => {
      const add = 'add' + key.charAt(0).toUpperCase() + key.slice(1)

      this[add] = function(params) {
        if (typeof params === 'object') {
          this.ops[key] = this.ops[key].concat(params)
          return this
        }
        if (typeof params === 'string') {
          let temp = params.split(' ')
          this.ops[key] = temp
          return this
        }
      }
      this[key] = function(params) {
        this.ops[key] = []
        this[add](params)
        return this
      }
    })
  }

  combination(script, arrays, result) {
    if (arrays.length === 0) {
      // l(script)
      return null
    }
    const copy = arrays.slice()
    const first = copy.shift()
    if (first.length > 0) {
      first.forEach(name => {
        this.combination(script + (script ? ':' : '') + name, copy, result)
      })
    } else {
      result[script] = this.mapper(script)
    }
    return result
  }

  run() {
    const result = {}
    const arrays = []
    this.keys.forEach(key => arrays.push(this.ops[key]))

    const scripts = this.combination('', arrays, {})
    result.scripts = scripts
    return result
  }
}

module.exports = ScriptPermutator
