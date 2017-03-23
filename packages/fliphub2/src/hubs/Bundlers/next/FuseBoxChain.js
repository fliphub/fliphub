// const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
// const timer = require('fliptime')
// const Config = require('./Config')
// const ChainedMapTill = require('./ChainedMapTill')
//
// class FuseBoxConfig extends Config {
//   const ChainedMap = require('./ChainedMap')
//   const ChainedMapExtendable = require('./ChainedMapExtendable')
//   const Resolve = require('./Resolve')
//   const Plugin = require('./Plugin')
//   const {Fluent} = require('./ArithmeticsFluent')
//   const merge = require('deepmerge')
//   const Plugins = require('./Plugins')
//   const fsbx = require('fsbx')
//   const deepmerge = require('deepmerge')
//
//   // @TODO: make babelPlugin take in flat config?
//   // @TODO: `.extendTyped` to use validation on properties :-)
//   // if webpack, loaders map to plugins and plugins -> plugins?
//   module.exports = class extends ChainedMapExtendable {
//     constructor(parent) {
//       super(parent)
//       this.plugins = new Plugins(this)
//
//       // so we just get the plugins
//       delete fsbx.FuseBox
//       Object.keys(fsbx).forEach(name => {
//         this.plugins.inittable.set(name.toLowerCase(), fsbx[name])
//       })
//
//       this.package = (pkgs) => {
//         const _package = new ChainedMap(this)
//         if (typeof pkgs === 'string') _package.set('name', pkgs)
//         else _package.merge(pkgs)
//         this._package = _package
//         return this
//       }
//       // this.autoImport = new ChainedMap(this)
//       // this.shim = new ChainedMap(this)
//       this.resolve = new Resolve(this)
//       this.alias = this.resolve.alias
//
//       this.instructions = new Fluent(this)
//       this.extendBool([
//         'cache',
//         'log',
//         'debug',
//       ], true)
//       this.extend([
//         'globals',
//         'target',
//         'homeDir',
//         'outFile',
//         'sourceMaps',
//         'autoImport',
//         'shim',
//       ])
//     }
//     plugin(name) {
//       if (!this.plugins.has(name)) {
//         this.plugins.set(name, new Plugin(this))
//       }
//
//       return this.plugins.get(name)
//     }
//
//     instruct(name) {
//       return this.instructions
//     }
//
//     toFuseBox() {
//       // const entryPoints = this.entryPoints.entries() || {}
//       // const entries = Object
//       //   .keys(entryPoints)
//       //   .reduce((acc, key) => Object.assign(acc, {[key]: entryPoints[key].values()}), {})
//       const alias = this.alias.entries()
//       const {
//         cache, log, target,
//         debug, globals, homeDir,
//         sourceMaps,
//         shim, autoImport,
//       } = this.entries()
//       const instruction = this.instructions.toInstructions()
//       // const autoImport = this.autoImport.entries()
//       // const shim = this.shim.entries()
//
//       const plugins = []
//       const pluginsByName = this.plugins.inittable
//       Object.keys(this.plugins.entries()).forEach(name => {
//         if (!name.includes('plugin')) name += 'plugin'
//         name = name.toLowerCase()
//         const conf = this.plugins.get(name)
//         const fsbxPlug = this.plugins.inittable.get(name)
//         if (fsbxPlug) {
//           const plug = fsbxPlug(conf)
//           plugins.push(plug)
//         }
//         delete this.plugins.parent
//         // console.log(this.plugins.inittable.has(name))
//         // console.verbose(this.plugins.inittable)
//         // console.verbose(fsbxPlug)
//       })
//       // console.verbose(this.plugins.inittable.values())
//       // console.verbose(plugins)
//       const config = {
//         autoImport, shim, plugins, debug, cache, globals,
//         homeDir, log, target, alias, sourceMaps,
//       }
//
//       // delete this.srcmaps.parent
//       console.verbose(config)
//
//       // delete plugs.parent
//       // console.verbose(plugs)
//       // .map(plugin => {
//       //   console.verbose(plugin)
//       //   // pluginsByName.get(plugin)
//       // })
//
//       // delete plugins.parent
//       // console.verbose({
//       //   cache, log, target,
//       //   debug, globals, homeDir,
//       //   alias, instruction,
//       //   autoImport, shim,
//       // })
//       // console.verbose(plugins)
//
//       // .package('canadaEh')
//       // .sourceMaps().vendor(true).project(true)
//       // .shim.from({
//       //   'react-native-web': {exports: 'require(\'react-native\')'},
//       // })
//       // .autoImport.use({
//       //   Inferno: 'inferno',
//       // })
//       //
//       // .instruct()
//       //   .entry('eh')
//       //     .noDeps()
//       //     .noCache()
//       //     .execute('./eh')
//       //     .exclude('dis')
//       //     .include(['path', 'fs'])
//       //     .add('eh')
//       //   .entry('canada')
//       //     .cache()
//       //     .noApi()
//       //     .vendor()
//       //     .execute('/src/eh.js')
//       //     .add('webworkerfile.js')
//       //     .exclude('fs')
//       // .finish()
//       //
//       // .plugins
//       //   .plugin('json')
//       //   .plugin('html').use({default: true})
//       //   .plugin('babel').from({
//       //     'sourceMaps': true,
//       //     'presets': [['env', {
//       //       'targets': {
//       //         'chrome': 56,
//       //       },
//       //     }]],
//       //     'plugins': [
//       //       'transform-react-jsx',
//       //       'transform-object-rest-spread',
//       //       'transform-decorators-legacy',
//       //       'transform-class-properties',
//       //       'add-module-exports',
//       //     ],
//       //   })
//     }
//
//     merge(obj = {}) {
//       Object
//         .keys(obj)
//         .forEach(key => {
//           const value = obj[key]
//           console.log(value)
//           switch (key) {
//             case 'alias': {
//               return this[key].merge(value)
//             }
//             case 'cache':
//             case 'log':
//             case 'resolve':
//             case 'target':
//             case 'debug':
//             case 'sourceMaps':
//             case 'homeDir':
//             case 'globals': {
//               return this.set(key, value)
//             }
//             case 'autoImport':
//             case 'shim': {
//               const val = this.get(key)
//               const updated = deepmerge(val, value)
//               return this.set(key, updated)
//             }
//
//             // case 'entry': {
//             //   return Object
//             //     .keys(value)
//             //     .forEach(name => this.entry(name).merge(value[name]))
//             // }
//             //
//             // case 'plugin': {
//             //   return Object
//             //     .keys(value)
//             //     .forEach(name => this.plugin(name).merge(value[name]))
//             // }
//
//             // default: {
//             //   this.set(key, value)
//             // }
//           }
//         })
//
//       return this
//     }
//   }
//
// function flat(paths) {
//   if (paths[0] && !paths[1] && Array.isArray(paths[0])) paths = paths[0]
//   return paths
// }
//
// class Fluent extends ChainedMapExtendable {
//   constructor(parent) {
//     super(parent)
//     this.bundled = {}
//     this.entry = this.startBundle = this.start.bind(this)
//     // this.end = this.finish
//   }
//   reset() {
//     this.bundled = {}
//     return this
//   }
//   start(name) {
//     this.bundled[name] = new FluentChain(name, this)
//     return this.bundled[name]
//   }
//   toInstructions() {
//     const keys = Object.keys(this.bundled)
//     let instructions = {}
//     if (keys.length > 1) {
//       keys.forEach(key => {
//         const instruction = this.bundled[key]
//         instructions[key] = instruction.toConfig()
//       })
//     }
//     else {
//       instructions = this.bundled[keys[0]].toConfig()
//     }
//     return instructions
//   }
// }
//
//
// // @TODO: what if things need to be in a particular order and you're using raw...
// class FluentChain extends ChainedMapExtendable {
//   constructor(name, parent) {
//     super(parent)
//     this.name = name
//     this._include = new Set()
//     this._exclude = new Set()
//     this.raw = ''
//     this.extendTrue([
//       'cache', 'api', 'vendor',
//     ])
//     this.extendBool(['cache', 'api', 'vendor'], true)
//     this.extend(['execute'])
//     this.noDeps = this.ignoreDeps = this.excludeDeps = () =>
//       this.set('_noDeps', true)
//     // this.deps = (deps = true) => this.set('_noDeps', !deps)
//     this.includeDeps = () => this.set('_noDeps', false)
//     this.onlyDeps = this.vendor = (vendor = true) => this.set('vendor', vendor)
//
//     this.ignore = this.exclude
//     this.add = this.include
//     this.entry = this.parent.entry
//     this.endInstruct = () => this.parent.parent
//   }
//   finish() {
//     return this.parent.parent
//   }
//   and(cmd) {
//     this.raw += cmd
//     return this
//   }
//   include(...paths) {
//     flat(paths).forEach(path => this._include.add(path))
//     return this
//   }
//   exclude(...paths) {
//     flat(paths).forEach(path => this._exclude.add(path))
//     return this
//   }
//
//
//   // shorthand
//   noCache() {
//     return this.api(false)
//   }
//   noApi() {
//     return this.set('api', false)
//   }
//
//   toConfig() {
//     const no = this.get('_noDeps')
//     const execute = this.get('execute')
//
//     const include = [...this._include.values()]
//     const exclude = [...this._exclude.values()]
//
//     const api = this.get('api') ? '!' : ''
//     const cache = this.get('cache') ? '^' : ''
//     const vendor = this.get('vendor') ? '~' : ''
//     const rollup = this.get('rollup') ? '%' : ''
//     let instruction = `${api}${vendor}${cache}${rollup}`
//
//     if (execute) instruction += `\n >`
//     if (execute && no) instruction += `[${execute}]`
//     else if (execute) instruction += `${execute}`
//
//     if (include) instruction += `\n` + include.map(inc => ' +' + inc).join('')
//     if (exclude) instruction += `\n` + exclude.map(ex => ' -' + ex).join('')
//
//     if (this.raw) instruction += this.raw
//
//     return instruction
//   }
//
//   // test(test) {
//   //   return this.set('test', test)
//   // }
// }
