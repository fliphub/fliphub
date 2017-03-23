const path = require('path')
const log = require('fliplog')
const rooter = require('mono-root')
const timer = require('fliptime')
const is = require('izz')
const resolveObj = require('./resolveObj')
const resolveProps = require('./resolveProps')
const resolveArr = require('./resolveArr')

let instance
class Resolver {
  static init(root) {
    if (instance) return instance
    timer.start('resolver')
    instance = new Resolver(root).fn()
    timer.stop('resolver')
    return instance
  }
  constructor(root) {
    this.root = root
  }

  debug() {
    log.text('Resolver debug: ').data(this).verbose(true).echo()
    timer.log('resolver')
  }

  // called if they need to change the root path explicitly
  // and it will be by ref on this Resolver instance
  setRoot(root) {
    if (is.obj(root)) this.root = rooter(root)
    else if (is.num(root)) this.root = rooter({depth: root})
    else this.root = root || this.root
    if (!this.root) this.root = rooter()
  }

  fn() {
    // create
    const resolve = (paths) => {
      // handle root resolving only if needed
      // as it is expensive
      if (!instance.root) instance.root = rooter()
      return path.resolve(instance.root, paths)
    }
    const resolver = (paths) => {
      if (!paths) return paths
      if (!paths || path.isAbsolute(paths)) return paths
      return resolve(paths)
    }

    // decorate
    resolver.resolveTo = (paths, dir) => path.resolve(dir, paths)
    resolver.resolve = resolve

    // bind this resolver as the first arg
    resolver.arr = resolveArr.bind(this, resolver)
    resolver.obj = resolveObj.bind(this, resolver)
    resolver.forKeys = resolveProps.bind(this, resolver)
    resolver.forProps = resolver.forKeys
    resolver.debug = this.debug
    resolver.setRoot = this.setRoot

    return resolver
  }
}

const resolver = Resolver.init()

module.exports = resolver
