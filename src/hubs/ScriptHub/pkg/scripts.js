// from @challenger532
var l = console.log
function scripter() {
  this.meta = {
    options: [],
    compile: [],
    release: [],
    test: [],
  }

  function mapper(script) {
    return script
  }

  var keys = Object.keys(this.meta)
  keys.forEach(function(key) {
    var add = 'add' + key.charAt(0).toUpperCase() + key.slice(1)
    this[add] = function(params) {
      if (typeof params == 'object') {
        this.meta[key].concat(params)
        return this
      }
      if (typeof params == 'string') {
        var temp = params.split(' ')
        this.meta[key] = temp
        return this
      }
    }
    this[key] = function(params) {
      this.meta[key] = []
      this[add](params)
      return this
    }
  }, this)

  function combination(script, arrays, result) {
    if (arrays.length == 0) {
      l(script)
      return
    }
    var copy = arrays.slice()
    var temp = copy.shift()
    if (temp.length > 0) {
      temp.forEach(function(name) {
        combination(script + (script ? ':' : '') + name, copy, result)
      })
    } else {
      result[script] = mapper(script)
    }
    return result
  }

  this.run = function() {
    let result = {}
    var keys = Object.keys(this.meta)
    let arrays = []
    keys.forEach(function(key) {
      arrays.push(this.meta[key])
    },this)

    var scripts = combination('', arrays, {})
    result['packages'] = scripts
    return result
  }
}

var s = new scripter()

s.options('op1 opt2')
s.release('re1 re2')
// s.test('t1 t2')
console.log(s.addCompile('comp1 comp2').run())

// options: ['build,…]
// apps: ['…'],
// build: ({app, env}) => I'l make this callback,
// compile: ({app, env}) ^
// release: ({app, env, target}) ^
// }
