// const Translator = require('./translation')
// const PublishersFactory = require('./publishers')
// const z = require('z')
// import z from 'z'
import z from './z'

class Composite {
  constructor() {
    this.inspect = inspectorGadget(this, ['box', 'app', 'context', 'args'])
  }
  init({app, context, box, helpers}) {
    this.app = app
    this.context = context
    this.helpers = helpers
    this.box = box
    this.args = {app, context, helpers, box}
    // this.translator = new Translator(this.args)
    // this.extendable = PublishersFactory(this.args)
    // console.log(extendable)
    // console.log(Flags)
    // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(flag)))
    // process.exit(1)
  }

  decorate() {
    // DecoratorFactory(this.args)
    // this.extendable.forEach(xt => {
    //   xt.decorate(this.args)
    // })
    this.translator.translate()
  }
}

// first these should be `added` instead of initted here
// function setupBuiltInExtendable() {
//
//   // presets.addPreset({
//   //   'node': {
//   //     params: {
//   //       target: 'node',
//   //     },
//   //     loaders: {
//   //       babel: {
//   //         reactjsx: false,
//   //       },
//   //     },
//   //   },
//   // })
//   //
//   // console.log(presets)
//   // badLog(presets)
//   // process.exit(1)
//   //
//   // initted.forEach(xt => {
//   //   if (xt.test({app, context, helpers})) {
//   //     xt.decorate(args)
//   //   }
//   // })
// }
//
// function invokeExtensions({app, context, helpers}) {
// }

module.exports = Composite

// const Cache = require('./extendable/cache')
// const Filter = require('./extendable/filter')

// const clean = require('./ops/clean')
// const compile = require('./ops/compile')
// const dry = require('./ops/dry')
// const exec = require('./ops/exec')
// const run = require('./ops/run')
// const test = require('./ops/test')
// const watch = require('./ops/watch')

// class that takes in the box
// and adds plugins to the workflow
