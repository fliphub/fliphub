// @NOTE:
// from index of loaders previously
// if we use happypack,
// it is the only loader,
// and it takes in all of our other loaders
//
// https://github.com/amireh/happypack/issues/53#issuecomment-226356543
const HappyPackAPI = require('happypack')

class HappyPack {
  constructor() {
    this.init()
  }
  init() {
    this.loaders = false
    this.plugins = false

    this.params = {
      // cache: false,
      // threads: 4,
      include: ['./src'],
    }
  }

  getHappyPlugins() {
    const {loaders} = this
    const params = Object.assign({}, {}, this.params)
    delete params.include

    const packPlugins = []
    for (let i = 0; loaders.length > i; i++) {
      const loader = loaders[i]
      const loaderParams = params

      // @see ::getHappyLoaders#example
      const name = loader.loader || loader.loaders

      // has to be an array
      loaderParams.loaders = [loader]
      loaderParams.id = name
      packPlugins.push(new HappyPackAPI(loaderParams))
    }
  }

  // @NOTE:
  // always loaded before plugins
  getHappyLoaders() {
    const {loaders} = this
    const happyLoaders = []
    for (let i = 0; loaders.length > i; i++) {
      const loader = loaders[i]

      // compatibility with loader configs
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
      const name = loader.loader || loader.loaders || loader || i

      // happypack uses a happypack loader
      // with an id for each loader
      // then the plugin hijacks it and does the caching
      const happypack = {
        test: loader.test,
        loaders: ['happypack/loader?id=' + name],
      }

      happyLoaders.push(happypack)
    }

    return happyLoaders
  }
}

module.exports = HappyPack
