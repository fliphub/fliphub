const toArr = require('../../lib/helpers/toArr')
const Aliases = require('./model/Aliases')
const SourceMaps = require('./model/SourceMaps')
const Html = require('./model/Html')
const AbstractHub = require('../AbstractHub')
const Processors = require('./model/Loaders')
const Plugins = require('./model/Plugins')

// @NOTE: (move to flow, could use typescript)
// const builderSchema = {
//   loaders: [],
//   plugins: [],
//   loaderKeys: ['optional'],
//   target: ['enum'],
//   config: {},
//   api: {},
// }

// @TODO: Cache
// if true use happypack,
// or if happypack is enabled then cache is enabled?
//
// and for fusebox just set the config



// @NOTE:
// this is the unified standard
// from this, the bundlers can adapt the config
// first translated into this format
// and then adapted from this format into the bundler
class BuilderHub extends AbstractHub {
  appInit({context, app, helpers, box}) {
    // defaults
    this.target = 'web'
    this.aliases = new Aliases()

    this.loaders = Processors.model({helpers, context, app, box})
    this.plugins = Plugins.model({helpers, context, app, box})
    // this.rules = {}
    // this.plugins = []

    // @TODO:
    // could put this from the app onto the config as `finalize`
    // in a `builderhub` ?
    this.sourcemaps = new SourceMaps({helpers})

    // passed to api, is params?
    this.config = {}

    // internal configs for get and sets
    // this.payload = new Map()

    // new BuilderHub({helpers: box.helpers, context: this})
    this.html = Html.model({helpers, context})

    if (app.params) this.params = app.params

    context.builder = this
  }

  getPlugins(args) {
    return this.box.hubs.getHub('PluginHub').getPlugins(args)
  }
  getLoaders(args) {
    return this.box.hubs.getHub('PluginHub').getLoaders(args)
  }

  // @TODO: !!!!!
  // subscribe to register adapter
  // then if we have an adapter, use it
  registerAdapter() {

  }

  addLoaders(loaders) {
    this.loaders = this.loaders.concat(toArr(loaders))
  }
  addPlugins(plugins) {
    this.plugins = this.plugins.concat(toArr(plugins))
  }
  // get(key) {
  //   return this.payload.get(key)
  // }
  // set(key, value) {
  //   return this.payload.set(key, value)
  // }
}

BuilderHub.init = config => new BuilderHub(config)
module.exports = BuilderHub
