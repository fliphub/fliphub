const {addPrefix, removePrefix} = require('fliphub-helpers/src/str/prefix')
const arrToObj = require('arr-to-obj')
const ChainedMap = require('./ChainedMap')

class ChainedMapExtendable extends ChainedMap {
  decorateParent(decorations) {
    if (!this.decorated) this.decorated = new ChainedMap(this.parent)
    decorations.forEach((decoration) => {
      const method = decoration.method
      const returnee = decoration.return || this.parent
      const key = decoration.key || method
      this.parent[method] = (data) => {
        this.set(key, data)
        return returnee
      }
    })
  }

  extendAlias(methods, name, thisArg = null) {
    methods.forEach(method =>
      this[method] = this[name].bind(thisArg || this))
    return this
  }

  addChain(name, Chain) {
    // making name available as a property on chainable
    if (typeof name !== 'string') Chain = name
    const chained = new Chain(this)
    name = chained.name || name
    this[name] = chained
    this.chains.push(name)
    return this
  }

  // @TODO: extendBool which would add `no` firstChar.toUpperCase() + rest()
  extendBool(methods, val, prefix = 'no') {
    this.extendWith(methods, val)
    this.extendWith(methods.map((method) => (0, addPrefix)(method, prefix)), !val, prefix)
    return this
  }

  extendWith(methods, val, prefix) {
    const objMethods = (0, arrToObj)(methods, val)
    const keys = Object.keys(objMethods)
    this.shorthands = [...this.shorthands, ...keys]
    keys.forEach((method) => {
      this[method] = (value = objMethods[method]) => this.set((0, removePrefix)(method, 'no'), value)
    })
    return this
  }

  extendFalse(methods) {
    this.extendWith(methods, false)
    return this
  }

  extendTrue(methods) {
    this.extendWith(methods, true)
    return this
  }

  // extend with string types of izz
  // if it is that type, good, otherwise, nope.
  extendType(methods, type, msg = null) {
    const is = require('izz')
    methods.forEach(method => {
      this.shorthands.push(method)
      this[method] = (value) => {
        if (!is[type](value)) {
          if (msg) console.log(msg)
          return this
        }

        this.set(method, value)
        return this
      }
    })
    return this
  }

  extendIncrement(methods) {
    // every time it is called, just increment
    // add to this.shorthands
    methods.forEach(method => {
      this.shorthands.push(method)
      this[method] = () => {
        let value = (this.get(method) | 0) + 1
        this.set(method, value)
        return this
      }
    })
    return this
  }

  extendDefault(methods) {
    this.shorthands = [...this.shorthands, ...methods]
    Object.keys(methods).forEach((method) => {
      this[method] = (value = methods[method]) => this.set(method, value)
    })
  }
}

module.exports = ChainedMapExtendable
