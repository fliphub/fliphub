import {Chainable} from './Chainable'

class ChainableMap extends Chainable {
  public shorthands: Array<string> = []
  public options: Map<any, any> = new Map()

  public and() {
    if (this.parent.parent) return this.parent.parent
    return this.parent
  }
  
  public use(obj: Object) {
    return this.merge(obj).parent
  }

  public from(obj: Object) {
    let p = this.merge(obj).parent
    while (p.parent) {
      p = p.parent
    }
    return p
  }

  public extend(methods: Array<string>) {
    this.shorthands = methods
    methods.map(method => {
      this[method] = (value: any) => this.set(method, value)
    })
  }

  public clear() {
    this.options.clear()
    return this
  }

  public delete(key: any) {
    this.options.delete(key)
    return this
  }

  public entries() {
    const entries = [...this.options]

    if (!entries.length) {
      return
    }

    return entries.reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  public values() {
    return [...this.options.values()]
  }

  public get(key: any) {
    return this.options.get(key)
  }

  public has(key: any) {
    return this.options.has(key)
  }

  public set(key: any, value: any) {
    this.options.set(key, value)
    return this
  }

  public merge(obj: Object) {
    Object.keys(obj).forEach(key => {
      this.set(key, obj[key])
      // const eh = this.get(key)
      // console.verbose(, obj[key])
    })
    return this
  }

  public clean(obj: Object) {
    return Object
      .keys(obj)
      .reduce((acc, key) => {
        const value = obj[key]

        if (value === undefined) {
          return acc
        }

        if (Array.isArray(value) && !value.length) {
          return acc
        }

        if (Object.prototype.toString.call(value) === '[object Object]' && !Object.keys(value).length) {
          return acc
        }

        acc[key] = value

        return acc
      }, {})
  }
}

export {ChainableMap}
export default ChainableMap
