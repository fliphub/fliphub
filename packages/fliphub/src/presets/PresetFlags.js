// use flags here to do operations
// allows disabling them if using their own flags or whatever
// see spring/flaghub
//  /builtin
//  /flaghub

const flipflag = require('flipflag')
const log = require('fliplog')

module.exports = class PresetFlags {
  setArgs(args) {
    this.args = args
  }
  init(workflow) {

  }

  coreInit(core, context) {
  //   const config = context.config
  //   const names = []
  //   const flags = [{
  //     names,
  //     cb,
  //   }]
  //
  //   flipflag.findAll(flags)
  }
}


// -----------

// EXAMPLES
// https://github.com/AgronKabashi/rollup-plugin-conditional

// example from rollup-inferno
// const {NODE_ENV} = process.env
// if (NODE_ENV === 'production') {
//   plugins.push(
// 		uglify({
//   warnings: false,
//   compress: {
//     screw_ie8: true,
//     dead_code: true,
//     unused: true,
//     drop_debugger: true, //
//     booleans: true, // various optimizations for boolean context, for example !!a ? b : c → a ? b : c
//   },
//   mangle: {
//     screw_ie8: true,
//   },
// })
// 	)
//   plugins.push(
// 		replace({
//   VERSION: rootPackageJson.version,
//   'process.env.NODE_ENV': JSON.stringify('production'),
// })
// 	)
// } else if (NODE_ENV === 'browser') {
//   plugins.push(
// 		replace({
//   VERSION: rootPackageJson.version,
//   'process.env.NODE_ENV': JSON.stringify('development'),
// })
// 	)
// } else {
//   plugins.push(
// 		replace({
//   VERSION: rootPackageJson.version,
// })
// 	)
// }

// @TODO: some ramda support would make sense here with defaultsTo
// const entry = require.resolve(resolve(cwd, entryFile))
// let filename = name
// if (NODE_ENV === 'production') {
//   filename += '.min.js'
// } else if (NODE_ENV === 'development') {
//   filename += '.node.js'
// } else {
//   filename += '.js'
// }
