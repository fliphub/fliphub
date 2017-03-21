const fs = require('fs')
//
// // const cwd = process.cwd()
// // from pkgjson
// // const {
// // 	name,
// // 	version,
// // 	dependencies = {},
// // 	module: entryFile,
// // 	rollup: rollupConfig = {},
// // 	bundledDependencies = {},
// // } = pkgJson
//
// const is = require('izz')
//
// module.exports = class PresetSourceMap {
//   init() {
//     const rollup = require('rollup')
//
//     this.devtool = null
//     this.file = null
//   }
//
//   setArgs(arg) {
//     if (!arg) return
//     if (is.str(arg)) this.devtool = arg
//     else if (is.obj(arg)) {
//       this.devtool = arg.devtool
//       this.file = arg.file
//     }
//   }
//
//   toRollup() {
//     if (this.devtool === false) return {sourceMap: false}
//   }
//   toFuseBox() {
//     return {sourceMap: true}
//   }
//   toWebpack() {
//     return {devtool: this.devtool || 'hidden'}
//     // output: {sourceMapFile: ''}
//   }
// }
//
// // https://github.com/rollup/rollup/wiki/Plugins
// // BundlerConfig defaulter
// // appConfig defaulter?
// // https://github.com/frostney/rollup-plugin-alias
// // if using alias & rollup...
// // property-translator > preset in this case?
//
//
//
// class CompileOp {
//   handle(args) {
//     const commonjs = require('rollup-plugin-commonjs')
//     const buble = require('rollup-plugin-buble')
//     const plugins = [
//       commonjs({
//         include: 'node_modules/**',
//         external: () => false,
//       }),
//       buble({
//         objectAssign: 'Object.assign',
//       }),
//     ]
//
//
//     const rollupConfig = {
//       // The bundle's starting point. This file will be
//       // included, along with the minimum necessary code
//       // from its dependencies
//       entry: config.entry,
//       plugins: withNodeResolve(plugins, {
//         jsnext: true,
//         // main: true,
//         // skip: external,
//       }),
//     }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     rollup.rollup(rollupConfig).then(function(bundle) {
//       // Generate bundle + sourcemap
//       var result = bundle.generate({
//         // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
//         format: 'cjs',
//       })
//
//       // Cache our bundle for later use (optional)
//       cache = bundle
//
//       // fs.writeFileSync(config.outFile, result.code)
//
//       // Alternatively, let Rollup do it for you
//       // (this returns a promise). This is much
//       // easier if you're generating a sourcemap
//       bundle.write({
//         format: 'cjs',
//         dest: 'bundle.js',
//       })
//     })
//   }
// }
//
// module.exports = CompileOp
//
//
//
//
//
// #!/usr/bin/env node
//
// const {resolve, join} = require('path')
// const {rollup} = require('rollup')
// const replace = require('rollup-plugin-replace')
// const uglify = require('rollup-plugin-uglify')
// const buble = require('rollup-plugin-buble')
//
// const nodeResolve = require('rollup-plugin-node-resolve')
// const commonjs = require('rollup-plugin-commonjs')
//
// const PROJECT_FOLDER = resolve(__dirname, '..')
// const rootPackageJson = require(join(PROJECT_FOLDER, 'package.json'))
//
//
// const plugins = [
//   commonjs({
//     include: 'node_modules/**',
//   }),
//   buble({
//     objectAssign: 'Object.assign',
//   }),
// ]
//
//
// // Filesize plugin needs to be last to report correct filesizes when minified
// plugins.push(filesize())
//
// const COPYRIGHT_YEAR = new Date().getFullYear()
//
// function withNodeResolve(arr, resolveConfig) {
//   const newArray = Array.from(arr)
//   const index = newArray.findIndex(plugin => plugin.name === 'buble')
//   newArray.splice(index, 0, nodeResolve(resolveConfig))
//   return newArray
// }
//
// const cwd = process.cwd()
// const pkgJson = require(join(cwd, 'package.json'))
//
// const {
// 	name,
// 	version,
// 	dependencies = {},
// 	module: entryFile,
// 	rollup: rollupConfig = {},
// 	bundledDependencies = {},
// } = pkgJson
//
// const copyright = `
// /*!
//  * ${name} v${version}
//  * (c) ${COPYRIGHT_YEAR} ${rootPackageJson.author.name}'
//  * Released under the ${rootPackageJson.license} License.
//  */
