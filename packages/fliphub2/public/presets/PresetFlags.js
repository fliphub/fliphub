'use strict';

// use flags here to do operations
// allows disabling them if using their own flags or whatever
// see spring/flaghub
//  /builtin
//  /flaghub

const flipflag = require('flipflag');
const log = require('fliplog');
const cleanObj = require('clean-obj');

module.exports = class PresetFlags {
  coreInit(box, context) {
    const config = context.config;
    const names = ['opts', 'cache',

    // @TODO: for safety, `-o,--operations,--ops`
    // 'o,operations,ops',
    'o,operations,ops', 'dry', 'compile', 'exec', 'run', 'test', 'to', 'from', 'NODE_ENV', 'env'];

    const flags = [{
      names,
      cb: ({
        opts,
        cache,

        ops,
        dry, compile, exec, run, test,

        to, from,
        NODE_ENV, env
      }) => {
        // log.data(flipflag.aliased).verbose().text('aliased').echo()
        log.data({
          opts,
          cache,

          ops,
          dry,
          compile,
          exec,
          run,
          test,

          to,
          from,
          NODE_ENV,
          env
        }).text('flags:').color('blue').verbose().echo();

        const flips = {};
        if (to) flips.to = to;
        if (from) flips.from = from;
        if (to || from) context.merge({ flips });

        if (dry === true) {
          context.ops.cache(false).exec(false).run(false).test(false).compile(false).dry(true);
        }

        // @TODO: this does not work this way with rollup...
        // if (cache != undefined) app.config.merge({cache})
      }
    }];

    flipflag.findAll(flags);
  }
};

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