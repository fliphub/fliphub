// @NOTE:
// if we use happypack,
// it replaces compatible loaders
// and uses workers to do the processing in the plugins
//
// https://github.com/amireh/happypack/issues/53#issuecomment-226356543
// https://github.com/amireh/happypack/issues/119
// https://github.com/amireh/happypack/issues/58
// https://github.com/amireh/happypack/wiki/Loader-Compatibility-List
const HappyPackAPI = require('happypack')

function nameFromPath(name) {
  if (/node_modules/.test(name)) {
    name = name.split('node_modules/').pop()

    if (name.includes('/')) name = name.split('/').shift()
    // is for babel specifically: .replace('/lib/index.js', '')
  }

  return name
}

class HappyPack {
  constructor(rules, config) {
    this.init(rules, config)
  }
  init(rules, config) {
    this.config = config
    this.rules = rules
    this.rulesToRemove = []
    this.compatibilityList = ['babel', 'sass', 'style', 'transform']
    this.happyRules = []
    this.happyPlugins = []

    this.params = {
      // cache: false,
      // threads: 4,
      include: ['./src'],
    }
  }

  // @TODO: could also check an array of names
  isCompatible(name) {
    for (const i in this.compatibilityList) {
      const compat = this.compatibilityList[i]
      if (name.includes(compat)) return true
    }
    return false
  }

  getHappyPlugins() {
    const {rules, config} = this
    const happyParams = Object.assign({}, {}, this.params)
    delete happyParams.include

    for (let i = 0; rules.length > i; i++) {
      const rule = rules[i]
      const params = happyParams

      // @see ::getHappyLoaders#example
      let name = i
      if (rule.use && rule.use[0] && rule.use[0].loader) {
        name = rule.use[0].loader
        name = nameFromPath(name)
      }

      if (!this.isCompatible(name)) {
        console.log(name, 'NOT COMPATIBLE')
        continue
      }

      // has to be an array
      params.loaders = [name]
      params.id = name
      // params.options = options
      // log.data(params).verbose(true).echo()
      // process.exit()

      config
        .plugin('happypack' + i)
        .use(HappyPackAPI, params)
        .init(() => new HappyPackAPI(params))

      this.happyPlugins.push(new HappyPackAPI(params))
    }

    return this
  }

  // @NOTE:
  // always loaded before plugins
  happyRules() {
    const {rules, config} = this
    for (let i = 0; rules.length > i; i++) {
      const rule = rules[i]

      // old example:
      // @example:
      // {
      //    babel: {
      //      // when not using query
      //      loaders: 'babel-loader',
      //
      //      // when using query
      //      loader: 'babel-loader',
      //    },
      //    'babel-loader',
      // }

      // rules example:
      // @example:
      // {
      //  test: /\.jsx?$/,
      //  include: [ '/Users/code/src', '/Users/code/test' ],
      //  use: [{
      //    loader: '/Users/code/node_modules/neutrino-middleware-compile-loader/node_modules/babel-loader/lib/index.js',
      //    options: [Object]
      //  }]
      // }

      let name = i
      let options = rule.options
      if (rule.use && rule.use[0] && rule.use[0].loader) {
        name = rule.use[0].loader
        options = rule.use[0].options
        name = nameFromPath(name)
      }

      // happypack uses a happypack loader
      // with an id for each loader
      // then the plugin hijacks it and does the caching
      const happypack = {
        test: rule.test,
        use: {
          loaders: ['happypack/loader?id=' + name],
          options,
        },
      }

      this.rulesToRemove.push(rule)
      this.happyRules.push(happypack)
    }

    return this
  }
}

module.exports = function handleNeutrino(neutrino) {
  const {config} = neutrino
  const toConfig = config.toConfig()
  if (!toConfig.module || !toConfig.module.rules) return

  const rules = config.module.rules.values().map(r => r.toConfig())
  const happypack = new HappyPack(rules, config)
  const happyRules = happypack.happyRules()
  const happyPlugins = happypack.getHappyPlugins()
  const {rulesToRemove} = happypack
  for (const i in rulesToRemove) {
    const rule = rulesToRemove[i]
    config
      .module
      .rules
      .delete(rule)
  }
}
