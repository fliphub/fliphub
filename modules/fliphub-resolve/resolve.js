const path = require('path')
const rooter = require('mono-root')
const timer = require('fliptime')
const {exists} = require('flipfile')
const is = require('izz')
const resolveObj = require('./resolveObj')
const resolveProps = require('./resolveProps')
const resolveArr = require('./resolveArr')

let current = ''
let instances = {}
let instance
class Resolver {
  static init(root) {
    if (instance) return instance
    timer.start('resolver')
    instance = new Resolver(root).fn()
    instance.setRoot(root)
    instance.scoped = Resolver.scoped
    timer.stop('resolver')
    return instance
  }
  constructor(root) {
    this.root = root
  }

  debug() {
    const log = require('fliplog')
    log
      .tags('resolve')
      .text('Resolver debug: ')
      .data(this)
      .verbose(true)
      .echo()
    timer.log('resolver')
  }

  // called if they need to change the root path explicitly
  // and it will be by ref on this Resolver instance
  setRoot(root) {
    if (is.obj(root)) this.root = rooter(root)
    else if (is.num(root)) this.root = rooter({depth: root})
    else if (root) this.root = root
    if (!this.root) this.root = rooter()
    // log.data(root, this.root, is.obj(root), is.num(root)).echo()
    if (instances[current]) {
      instances[current].root = this.root
      return instances[current]
    }
    instance.root = this.root
    return this
  }

  static unscope() {
    current = false
    return instance
  }

  static scoped(named, root) {
    instances[named] = new Resolver(root).fn(named)
    instances[named].named = named
    instances[named] = instances[named]
    instances[named].scoped = Resolver.scoped
    current = named
    return instances[named]
  }

  fn(named = false) {
    // create
    const resolve = (paths) => {
      // scope
      let self = instance || this
      if (named !== false && instances[named]) {
        self = instances[named]
      }
      if (!self) self = {}

      // handle root resolving only if needed
      // as it is expensive
      if (!self.root) {
        // console.log('had no root...', self, name)
        self.root = rooter()
      }

      // @TODO: think more... maybe an optional?
      // take non relative paths, make them relative?
      if (!paths.includes('./')) {
        if (exists(path.resolve(self.root, paths))) {
          return path.resolve(self.root, paths)
        }
        return path.resolve(self.root, paths)
      }

      return path.resolve(self.root, paths)
    }
    const resolver = (paths) => {
      if (!paths) return paths
      if (typeof paths !== 'string') {
        if (Array.isArray(paths)) return resolver.obj(paths)
        if (typeof paths === 'object') return resolver.obj(paths)
      }

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
    resolver.rooter = rooter
    return resolver
  }
}

const resolver = Resolver.init()

module.exports = resolver
