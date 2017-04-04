// const chains = require('./index')
// console.assert(Object.keys(chains).length === 5)


const ChainedMap = require('./ChainedMapExtendable')
const ChainedSet = require('./ChainedSet')


class EasyFluent extends ChainedMap {
  static init(parent) {
    return new EasyFluent(parent)
  }
  constructor(parent) {
    super(parent)
    this.list = new ChainedSet(this)

    // extend a list of strings for easy chainable methods
    this.extend(['eh'])

    // same as .extend,
    // but when called with no arguments,
    // default is used (`true` in this case)
    // third param is optionally a prefix for inversified
    // for example, `no` => `noCanada()` for inverse value
    this.extendWith(['canada'], true)

    // using `izz` to validate types when setting
    // this.extendType(['str'], 'string')
  }

  addName(name) {
    this.list.add({name})
    return this
  }

  // if more advanced data changes are needed
  // .set, .get are available
  igloo(igloo) {
    this.set('igloo', igloo)
    return this
  }

  toConfig() {
    return Object.assign(this.entries(), {
      nameList: this.list.values().map(val => val.name),
    })
  }
}

const chain = EasyFluent
  .init()
  .igloo('brr')
  .canada()
  .eh('eh!')
  .addName('thing one')
  .addName('thing two')

// true, `eh!`
chain.has('igloo')
chain.get('eh')

const result = chain.toConfig()

// result === {
//   igloo: 'brr',
//   canada: 'canada',
//   eh: 'eh!',
//   nameList: [ 'thing one', 'thing two' ]
// }
