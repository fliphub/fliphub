
      // console.log(new Function(this.built))
      // console.log(eval(this.built))
      const util = require('util')
      const vm = require('vm')

      const sandbox2 = this.built
      const sandbox = sandbox2

      const script = new vm.Script('')

      const context = new vm.createContext(sandbox, {filename: 'myfile.vm'})
      for (var i = 0; i < 10; ++i) {
        script.runInContext(context)
      }

      console.log(util.inspect(context))


      process.exit()
// Promise.map =

// all 3 builders return  promises
// if it is a promise, `.then`
// else... call it, then do `.then`?

// const op = 'build'
// const cb = (bundler): Promise => {
//   return bundler.api[op]()
// }

// new Promise(resolve => resolve())
// .then(() => cb(tasks[0]))
// .then(() => i++; return cb(tasks[1]))
// .then(() => i++; return cb(tasks[2]))













const evts = require('./Events')
const Filter = require('../hubs/FilterHub')
const AppsContext = require('./AppsContext')
const Hubs = require('../hubs/LifeCycleHub')
const FlipConfig = require('../hubs/ConfigHub/FlipConfig')

const helpers = require('fliphub-helpers')
const resolve = require('fliphub-resolve')
const timer = require('fliptime')
const log = require('fliplog')
const {debugForFlags} = require('fliplog/debugFor')
const {inspectorGadget} = require('inspector-gadget')

const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const is = require('izz')

const Threads = require('threads_a_gogo')
const thread = Threads.create()
var Worker = require('threads_a_gogo').Worker


function fibo(n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1
}

function cbs(err, data) {
  console.log(this)
  process.stdout.write(data)
  this.eval('fibo(35)', cbs)
}

// thread.eval(fibo, cbs).eval('fibo(35)', cbs)

// (function spinForever() {
//   process.stdout.write('.')
//   setImmediate(spinForever)
// })()

// http://hellote.com/dynamic-promise-chains/
function maps(obj) {
  const arr = Object.keys(obj).map(key => ({
    key, val: obj[key],
  }))
  return Promise.map(arr, item => {

  })
}

// Promise.map =

// all 3 builders return  promises
// if it is a promise, `.then`
// else... call it, then do `.then`?

// const op = 'build'
// const cb = (bundler): Promise => {
//   return bundler.api[op]()
// }

// new Promise(resolve => resolve())
// .then(() => cb(tasks[0]))
// .then(() => i++; return cb(tasks[1]))
// .then(() => i++; return cb(tasks[2]))

function map(arr, cb) {
  // obj -> arr

  // empty promise to start the chain
  let chain = new Promise(resolve => resolve())

  function plz(err, data) {
    console.log(data)
    // process.exit(1)
  }
  const builds = arr.eh.api.build
  // log.data(builds).tosource().exit()

  function arri(err, data) {
    // console.log(this)
    // console.log(arr.neutrinos.api)
    // process.stdout.write(data)
    this.eval('builds()', plz)
  }
  thread.eval(builds).eval(fibo, arri)

  // return arr.forEach(name => {
  //   workers(function() {
  //     process.stdout.write('fuckin eh?')
  //
  //     // var ar = arr
  //     // var context = ar[name]
  //     // process.stdout.write(name)
  //     // process.stdout.write(context)
  //     // process.stdout.write(arr)
  //     // context.api.build()
  //   })
  // })






  // if (!is.arr(arr) && is.obj(arr)) arr = Object.keys(arr)
  //
  // // go through each
  // // chain them on the chain of promises
  // return arr.forEach(name => {
  //   chain = chain.then(resolved => cb(name))
  // })
}

function workers(cb) {
  // function() {
  //   postMessage('I\'m working before postMessage(\'ali\').')
  //   this.onmessage = function(event) {
  //     postMessage('Hi ' + event.data)
  //     self.close()
  //   }
  // }
  //
  // log.data({cb}).tosource().exit()
  // You may also pass in a function:
  var worker = new Worker()
}



module.exports = class FlipBox extends ChainedMapExtendable {
  static init(config) {
    return new FlipBox(config)
  }

  constructor(config) {
    super(config)
    this.inspect = inspectorGadget(this, ['hubs', 'filterer', 'parent'])

    timer.start('flip')
    timer.start('setup')

    resolve.setRoot(config.root)
    this.root = config.root = resolve.root

    this.flipConfig = new FlipConfig(this)
    if (config) this.flipConfig.merge(config)

    this.helpers = helpers
    this.debugFor = debugForFlags('*') // @TODO: config
    this.setupEvents()
    this.preSetup(config)

    this.ops = {
      build: () => {
        const results = []
        for (let name in this.built) {
          const context = this.built[name]
          results.push(context.api.build())
        }
        return results
      },
      buildSync: () => {
        return map(this.built, name => {
          const context = this.built[name]
          return context.api.build()
        })
      },
    }

    // build builds the config setup...
    // need to expose other methods
    // such as presets... apps... flip...
    // how to best manage operations...
    //
    // if they want to call `.devServer`, or `execute`...
    // or all of them are presets, and only core configs are here...
    this.setup = () => {
      this.setupFilter()
      if (this.filtered.length === 0) return

      timer.start('build')
      this.built = this.apps.build()
      timer.stop('build').log('build')
      timer.stop('flip').log('flip')

      return this.built
    }
    this.mediator = () => this.built
    timer.stop('setup').log('setup')
  }

  toConfig() {
    return Object
      .keys(this.built)
      .map(built => this.built[built].toConfig())
  }
  presets() {
    return this.flipConfig.presets
  }

  // @TODO:
  // make this happen after instantiate
  // such as in `build`
  // or add another lifecycle event, `instantiate` instead of `setup`
  //
  // so we could do dry runs and such as needed
  preSetup(config) {
    log.filter(config.debug)
    delete config.debug

    this.hubs = new Hubs(this)
    this.apps = new AppsContext(config.apps, this)

    // if this filters auto and it is before apps are decorated
    // then it will only do `defaultApps`, `--apps`, and passed in filters
    this.filterer = new Filter(this)
    this.filterer.onBoxSetup({apps: this.apps, box: this})
  }

  filter(filter) {
    this.filtered = this.filterer.filter(filter).filteredNames
  }

  setupFilter() {
    // if the client already filtered, ignore
    if (!this.filtered) this.filtered = this.filterer.filterAuto().filteredNames
    if (this.filtered.length === 0)
      log.text(`🕳  had no apps, all empty eh.`).color('bold').echo()
    else this.apps.setup()
  }

  // should really be on `AppsContext` ?
  setupEvents() {
    this.evts = evts
    this.emit = (a1, a2, a3, a4, a5) => this.evts.emit(a1, a2, a3, a4, a5)
    this.evts.onAny(function(event, value) {
      // if (event == 'removeListener') return
      // console._text('FLIPBOX: ' + event)
    })
    this.on = (name, handler) => this.evts.on(name, handler)
  }
}
