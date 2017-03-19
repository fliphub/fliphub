// use flags here to do operations
// allows disabling them if using their own flags or whatever
// see spring/flaghub
//  /builtin
//  /flaghub


function forFlag(flag, override, context) {
  const name = Object.keys(flag)[0]
  const val = flag[name]
  const valIsReal = val != undefined
  const valNotOnContext = (context[name] == undefined)
  const valIsRealAndNotOnContext = valIsReal && valNotOnContext
  if (override || valIsRealAndNotOnContext) context[name] = val
}

function flagDefaults() {
  let flags = [{
    names: [
      {flag: 'dry'},
      {flag: 'compile'},
      {flag: 'exec'},
      {flag: 'run'},
      {flag: 'test'},
      {flag: 'fusebox'}, // , type: 'bool', default: false
      {flag: 'cache'}, // , type: 'bool', default: false

      {flag: 'override'}, // , type: 'bool', default: false
      {flag: 'force'}, // , type: 'bool', default: false
    ],
    cb: (
      // flags
      {
        dry,
        compile, exec, run, test,
        fusebox, fuseboxa, cache,
        override, force,
      },

      // dependencies/args
      {context, app}
    ) => {
      const write = force || override
      // might have another handler that is not flags
      // do not want to override
      forFlag({fusebox}, write, app)
      forFlag({compile}, write, app)
      forFlag({exec}, write, app)
      forFlag({run}, write, app)
      forFlag({test}, write, app)
      forFlag({fuseboxAlias: fuseboxa}, override, app)

      if (dry === true) {
        app.compile = app.cache = app.exec = app.run = app.test = false
        app.dry = true
      }
      if (cache != undefined) context.settings.cache = cache

      // @TODO:
      // if (test) {
      //   if (decorated.presets) {
      //     decorated.presets.push('test')
      //     decorated.presets.push('mocha')
      //   }
      //   else decorated.presets = ['test', 'mocha']
      // }
      // helpers.log.verbose(decorated)
      // return decorated
    },
  }]

  return flags
}

module.exports = flagDefaults









 // EXAMPLES
https://github.com/AgronKabashi/rollup-plugin-conditional

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
