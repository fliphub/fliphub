// use flags here to do operations
// allows disabling them if using their own flags or whatever
// see spring/flaghub
//  /builtin
//  /flaghub

const flipflag = require('flipflag')
const log = require('fliplog')

// https://github.com/rollup/rollup/issues/844
module.exports = class PresetBabel {
  init() {}
  setArgs(args) {
    if (args) this.args = args
    return this
  }

  toWebpack() {
    const compile = require('neutrino-middleware-compile-loader')
    return (neutrino) => neutrino.use(compile)
  }
  toRollup() {
    const babel = require('rollup-plugin-babel')
    return {
      pluginIndex: 95,
      plugins: [babel()],
    }
  }

  // @TODO: have to deal with using babili...
  // toFuseBox() {
  //   const {BabelPlugin} = require('fsbx')
  //   const {UglifyJSPlugin} = require('fuse-box')
  //
  //   return {
  //     pluginIndex: -100,
  //     plugins: [BabelPlugin()],
  //   }
  // }
}

module.exports = class PresetFlags {
  init(app, bundlerConfig) {
    const names = [
      'opts',
      'cache',

      // @TODO: for safety, `-o,--operations,--ops`
      // 'o,operations,ops',
      'o,operations,ops',
      'dry', 'compile', 'exec', 'run', 'test',

      'to', 'from',
      'fromfusebox', 'fromwebpack', 'fromrollup',
      'tofusebox', 'towebpack', 'torollup',

      'NODE_ENV', 'env',
    ]

    let flags = [{
      names,
      cb: ({
        opts,
        cache,

        ops,
        dry, compile, exec, run, test,

        to, from,
        fromfusebox, fromwebpack, fromrollup,
        tofusebox, towebpack, torollup,

        NODE_ENV, env,
      }) => {
        // log.data(flipflag.aliased).verbose().text('aliased').echo()
        log.data({
          opts,
          cache,

          ops,
          dry, compile, exec, run, test,

          to, from,
          fromfusebox, fromwebpack, fromrollup,
          tofusebox, towebpack, torollup,

          NODE_ENV, env,
        }).text('args').verbose().echo()

        if (dry === true) {
          app.ops
            .cache(false)
            .exec(false)
            .run(false)
            .test(false)
            .compile(false)
            .dry(true)
        }

        // @TODO: this does not work this way with rollup...
        // if (cache != undefined) app.config.merge({cache})
      },
    }]

    flipflag.findAll(flags)
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
