import ChainedMap from './ChainedMap'
import {addPrefix, removePrefix, arrToObj} from '../../util'

export type ExtendableMethods = Array<string>

class ChainedMapExtendable extends ChainedMap {
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
