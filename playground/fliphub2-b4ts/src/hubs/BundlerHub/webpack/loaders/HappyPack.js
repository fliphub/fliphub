// @TODO:
//  might want to split with `translate` and `decorate`
//  per plugins and loaders?
class HappyPack {
  adaptAll() {
    
  }


  // @NOTE: from index of loaders previously
  // if we use happypack,
  // it is the only loader,
  // and it takes in all of our other loaders
  //
  // @TODO: or app.cache?
  // if (app.happypack) {
  //   builder.happypack = new HappyPack({context, helpers, app})
  //   return builder.happypack.loaders({
  //     app, context, helpers,
  //     loaders: loadersToAdd,
  //   })
  // }


  plugin({app, context, box, helpers}) {
    // https://github.com/amireh/happypack/issues/53#issuecomment-226356543
    const HappyPackAPI = require('happypack')
    this.api = HappyPackAPI

    const {builder} = context
    let params = {
      // loaders is the only required parameter:
      loaders: builder.happypackLoaders,
    }

    // @see this.loaders()
    // clear ref to it,
    // already used where it needs to be ^
    delete builder.happypackLoaders

    // pass down to happypack to let it debug
    params.debug = (context.debug.happypack)
    params.verbose = (context.debug.happypack && context.debug.verbose)
    params.cache = context.settings.cache

    // ----
    // only valid params
    const filtered = Object.assign({}, app.happypack)

    // @NOTE: include is only used in loaders, not plugin
    delete filtered.include

    // merge options
    params = Object.assign(params, filtered)
    // ----

    const packPlugins = []
    for (let i = 0; params.loaders.length > i; i++) {
      const loader = params.loaders[i]
      const loaderParams = params

      // @see this.loaders -> compat
      // compat
      const name = loader.loader || loader.loaders

      // has to be an array
      loaderParams.loaders = [loader]
      loaderParams.id = name
      packPlugins.push(new HappyPackAPI(loaderParams))
    }

    context.debugFor(['happypack', 'loaders'],
      '☺️️  🏋️  happypack.loaders', 'blue', packPlugins)

    builder.addPlugins(packPlugins)
  }

  // @NOTE:
  // always loaded before plugins
  loaders({app, context, helpers, loaders}) {
    const {builder} = context
    const happypacks = []

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
      const name = loader.loader || loader.loaders || loader

      // happypack uses a happypack loader
      // with an id for each loader
      // then the plugin hijacks it and does the caching
      const happypack = {
        test: loader.test,
        loaders: ['happypack/loader?id=' + name],
      }

      happypacks.push(happypack)
    }

    context.debugFor(['happypack', 'plugins'],
      '☺️️  🔌  happypack.plugins', 'blue', happypacks)

    // add to builder for use in end webpack config
    builder.addLoaders(happypacks)

    // setting as property for use when plugins is called
    builder.happypackLoaders = happypacks
  }

  // or decorate or init...
  defaults({app, context, helpers}) {
    const {happypack} = app
    if (!happypack) return

    // builder defaults
    const {builder} = context
    builder.happypack = builder.happypack || {}

    // magic defaults
    if (happypack.include && happypack.include[0] && happypack.include[0].includes('___________')) {
      console._warn('using default happypack include, which is `src/`')
      this.include = [helpers.resolve('./src/')]
    }

    // TODO: should be resolved elsewhere
    // if (!Array.isArray(appyhap.include)) appyhap.include = [appyhap.include]
    if (happypack.include)
      this.include = happypack.include.map(helpers.resolve)
    else
      throw new FlipValidationError('when using happypack, you have to specify which to include')


      // happypack: false,
      // happypack: {
      //   cache: false,
      //   threads: 4,
      //
      //   // this will make it load everything in node_modules if it is root...
      //   // - issue was it was not setting builders as external
      //   include: ['___________'],
      // },
      // // @TODO: improve
      // // if (app.entry) {
      // if (app.happypack === false) {
      //   delete merged.happypack
      //   merged.happypack = false
      // }
      //
      // if (merged.happypack && merged.happypack.include) {
      //   merged.happypack.include = merged.happypack.include.map(helpers.resolve)
      // }
  }
}

module.exports = HappyPack
