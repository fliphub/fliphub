import Chainable from './Chainable'
import ChainedMap from './ChainedMap'
import ChainedSet from './ChainedSet'
import {addPrefix, removePrefix, arrToObj} from '../../util'

export type ExtendableMethods = Array<string>
export interface DecorateParent {
  // method for parent
  method: string,
  // key for child (defaults to method, is recommended)
  key?: string,
  // return value, default is `this.parent`
  return?: Object,
}

export type ParentDecorations = Array<DecorateParent>

class ChainedMapExtendable extends ChainedMap {
  public decorated?: ChainedMap

  // @TODO: should use merge?
  public decorateParent(decorations: ParentDecorations) {
    if (!this.decorated) this.decorated = new ChainedMap(this.parent)
    decorations.forEach(decoration => {
      const method = decoration.method
      const returnee = decoration.return || this.parent
      const key = decoration.key || method

      this.parent[method] = (data) => {
        this.set(key, data)
        return returnee
      }
    })
  }

  public addChain(name: string | Chainable, Chain?: Chainable) {
    // making name available as a property on chainable
    if (typeof name !== 'string') Chain = name
    const chained = new Chain(this)
    name = chained.name || name
    this[name] = chained
    this.chains.push(name)
    return this
  }

  // @TODO: extendBool which would add `no` firstChar.toUpperCase() + rest()
  public extendBool(methods: ExtendableMethods, val: any, prefix: string = 'no') {
    this.extendWith(methods, val)
    this.extendWith(methods.map(method =>
      addPrefix(method, prefix)), !val, prefix)
  }

  public extendWith(methods: ExtendableMethods, val: any, prefix?: string) {
    const objMethods = arrToObj(methods, val)
    const keys = Object.keys(objMethods)
    this.shorthands = [...this.shorthands, ...keys]
    keys.forEach(method => {
      this[method] = (value = objMethods[method]) => {
        return this.set(removePrefix(method, 'no'), value)
      }
    })
  }

  public extendFalse(methods: ExtendableMethods) {
    this.extendWith(methods, false)
  }

  public extendTrue(methods: ExtendableMethods) {
    this.extendWith(methods, true)
  }

  public extendDefault(methods: ExtendableMethods) {
    this.shorthands = [...this.shorthands, ...methods]
    Object.keys(methods).forEach(method => {
      this[method] = (value = methods[method]) => this.set(method, value)
    })
  }
}

export {ChainedMapExtendable}
export default ChainedMapExtendable
