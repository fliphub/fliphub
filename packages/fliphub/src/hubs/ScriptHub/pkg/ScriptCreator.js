// from @challenger532
class ScriptCreator {
  constructor(mapper, ops = {
    env: ['dev', 'prod'],
    operations: [],
    apps: [],
    empty: [],
  }) {
    this.mapper = mapper
    this.ops = ops
    this.keys = Object.keys(this.ops)
    this.handleOptions()
  }

  // take the keys
  // prefix add___
  handleOptions() {
    this.keys.forEach(key => {
      const add = 'add' + key.charAt(0).toUpperCase() + key.slice(1)

      this[add] = function(params) {
        if (typeof params == 'object') {
          this.ops[key] = this.ops[key].concat(params)
          return this
        }
        if (typeof params == 'string') {
          var temp = params.split(' ')
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
    if (arrays.length == 0) {
      // l(script)
      return
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
    result['scripts'] = scripts
    return result
  }
}

const scriptCreator = new ScriptCreator(mapper)
function mapper(script) {
  return script
}

// map configs to run with cli
//
// add to root package to manage all subpackages,
// and optionally in sub packages
//
// check if it already exists
// addScript('help')
scriptCreator.env('dev prod devprod')
scriptCreator.apps('app1 app2')
scriptCreator.addOperations('test compile run dry')

const scripts = scriptCreator.run()
console.log(scripts)
