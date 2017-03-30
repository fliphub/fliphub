import Chainable from './Chainable'

class ChainedSet extends Chainable {
  public collection: Set<any> = new Set()

  public add(value: any) {
    this.collection.add(value)
    return this
  }

  public prepend(value: any) {
    this.collection = new Set([value, ...this.collection])
    return this
  }

  public clear() {
    this.collection.clear()
    return this
  }

  public delete(value: any) {
    this.collection.delete(value)
    return this
  }

  public values() {
    return [...this.collection]
  }

  public has(value: any) {
    return this.collection.has(value)
  }

  public merge(arr: Array<any> | Set<any>) {
    this.collection = new Set([...this.collection, ...arr])
    return this
  }
}

export {ChainedSet}
export default ChainedSet
