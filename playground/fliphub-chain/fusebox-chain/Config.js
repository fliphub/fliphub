const ChainedMap = require('./ChainedMap')
const ChainedMapExtendable = require('./ChainedMapExtendable')
const ChainedMapTill = require('./ChainedMapTill')
const Resolve = require('./Resolve')
const Plugin = require('./Plugin')
const {Fluent} = require('./ArithmeticsFluent')
const merge = require('deepmerge')
const Plugins = require('./Plugins')
const fsbx = require('fuse-box')
const deepmerge = require('deepmerge')

// @TODO: make babelPlugin take in flat config?
// @TODO: `.extendTyped` to use validation on properties :-)
// if webpack, loaders map to plugins and plugins -> plugins?
module.exports = class extends ChainedMapExtendable {
  constructor() {
    super()
    // this.devServer = new DevServer(this)
    this.plugins = new Plugins(this)

    // so we just get the plugins
    delete fsbx.FuseBox
    Object.keys(fsbx).forEach(name => {
      // .replace('Plugin', '')
      // fsbx[name]
      // console.log(name, name.toLowerCase())
      this.plugins.inittable.set(name.toLowerCase(), fsbx[name])
    })
    // this.sourceMaps = () => this._sourceMaps = new ChainedMap(this)

    this.ops = {
      bundle: () => {
        console.log('bundle!!!')
        return this
      },
    }
    // this.sourceMaps = args => {
    //   this.srcmaps = ChainedMapTill.from(this, ['vendor', 'project'], args)
    //   return this.srcmaps
    // }

    this.package = (pkgs) => {
      const _package = new ChainedMap(this)
      if (typeof pkgs === 'string') _package.set('name', pkgs)
      else _package.merge(pkgs)
      this._package = _package
      return this
    }
    // this.autoImport = new ChainedMap(this)
    // this.shim = new ChainedMap(this)
    this.resolve = new Resolve(this)
    this.alias = this.resolve.alias

    this.instructions = new Fluent(this)
    this.extendBool([
      'cache',
      'log',
      'debug',
    ], true)
    this.extend([
      'globals',
      'target',
      'homeDir',
      'outFile',
      'sourceMaps',
      'autoImport',
      'shim',
    ])
  }
  plugin(name) {
    if (!this.plugins.has(name)) {
      this.plugins.set(name, new Plugin(this))
    }

    return this.plugins.get(name)
  }

  instruct(name) {
    return this.instructions
  }

  toWebpack() {

  }

  toFuseBox() {
    // const entryPoints = this.entryPoints.entries() || {}
    // const entries = Object
    //   .keys(entryPoints)
    //   .reduce((acc, key) => Object.assign(acc, {[key]: entryPoints[key].values()}), {})
    const alias = this.alias.entries()
    const {
      cache, log, target,
      debug, globals, homeDir,
      sourceMaps,
      shim, autoImport,
    } = this.entries()
    const instruction = this.instructions.toInstructions()
    // const autoImport = this.autoImport.entries()
    // const shim = this.shim.entries()

    // const {
    //   vendor,
    //   project,
    // } = this
    // const sourceMaps = {vendor, project}
    // const sourceMaps = this.sourceMaps

    const plugins = []
    const pluginsByName = this.plugins.inittable
    Object.keys(this.plugins.entries()).forEach(name => {
      if (!name.includes('plugin')) name += 'plugin'
      name = name.toLowerCase()
      const conf = this.plugins.get(name)
      const fsbxPlug = this.plugins.inittable.get(name)
      if (fsbxPlug) {
        const plug = fsbxPlug(conf)
        plugins.push(plug)
      }
      delete this.plugins.parent
      // console.log(this.plugins.inittable.has(name))
      // console.verbose(this.plugins.inittable)
      // console.verbose(fsbxPlug)
    })
    // console.verbose(this.plugins.inittable.values())
    // console.verbose(plugins)
    const config = {
      autoImport, shim, plugins, debug, cache, globals,
      homeDir, log, target, alias, sourceMaps,
    }

    // delete this.srcmaps.parent
    console.verbose(config)

    // delete plugs.parent
    // console.verbose(plugs)
    // .map(plugin => {
    //   console.verbose(plugin)
    //   // pluginsByName.get(plugin)
    // })

    // delete plugins.parent
    // console.verbose({
    //   cache, log, target,
    //   debug, globals, homeDir,
    //   alias, instruction,
    //   autoImport, shim,
    // })
    // console.verbose(plugins)

    // .package('canadaEh')
    // .sourceMaps().vendor(true).project(true)
    // .shim.from({
    //   'react-native-web': {exports: 'require(\'react-native\')'},
    // })
    // .autoImport.use({
    //   Inferno: 'inferno',
    // })
    //
    // .instruct()
    //   .entry('eh')
    //     .noDeps()
    //     .noCache()
    //     .execute('./eh')
    //     .exclude('dis')
    //     .include(['path', 'fs'])
    //     .add('eh')
    //   .entry('canada')
    //     .cache()
    //     .noApi()
    //     .vendor()
    //     .execute('/src/eh.js')
    //     .add('webworkerfile.js')
    //     .exclude('fs')
    // .finish()
    //
    // .plugins
    //   .plugin('json')
    //   .plugin('html').use({default: true})
    //   .plugin('babel').from({
    //     'sourceMaps': true,
    //     'presets': [['env', {
    //       'targets': {
    //         'chrome': 56,
    //       },
    //     }]],
    //     'plugins': [
    //       'transform-react-jsx',
    //       'transform-object-rest-spread',
    //       'transform-decorators-legacy',
    //       'transform-class-properties',
    //       'add-module-exports',
    //     ],
    //   })
  }

  // entry(name) {
  //   if (!this.entryPoints.has(name)) {
  //     this.entryPoints.set(name, new ChainedSet(this))
  //   }
  //
  //   return this.entryPoints.get(name)
  // }
  // toConfig() {
  //   const entryPoints = this.entryPoints.entries() || {}
  //
  //   return this.clean(Object.assign(this.entries() || {}, {
  //     node: this.node.entries(),
  //     output: this.output.entries(),
  //     resolve: this.resolve.toConfig(),
  //     resolveLoader: this.resolveLoader.toConfig(),
  //     devServer: this.devServer.entries(),
  //     module: this.module.toConfig(),
  //     plugins: this.plugins.values().map(plugin => plugin.toConfig()),
  //     entry: Object
  //       .keys(entryPoints)
  //       .reduce((acc, key) => Object.assign(acc, {[key]: entryPoints[key].values()}), {}),
  //   }))
  // }
  //
  merge(obj = {}) {
    Object
      .keys(obj)
      .forEach(key => {
        const value = obj[key]
        console.log(value)
        switch (key) {
          case 'alias': {
            return this[key].merge(value)
          }
          case 'cache':
          case 'log':
          case 'resolve':
          case 'target':
          case 'debug':
          case 'sourceMaps':
          case 'homeDir':
          case 'globals': {
            return this.set(key, value)
          }
          case 'autoImport':
          case 'shim': {
            const val = this.get(key)
            const updated = deepmerge(val, value)
            return this.set(key, updated)
          }

          // case 'entry': {
          //   return Object
          //     .keys(value)
          //     .forEach(name => this.entry(name).merge(value[name]))
          // }
          //
          // case 'plugin': {
          //   return Object
          //     .keys(value)
          //     .forEach(name => this.plugin(name).merge(value[name]))
          // }

          // default: {
          //   this.set(key, value)
          // }
        }
      })

    return this
  }
}
