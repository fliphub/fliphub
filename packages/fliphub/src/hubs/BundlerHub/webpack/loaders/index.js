const babel = require('./BabelAdapter')
const styles = require('./StyleAdapter')
const ts = require('./TypeScriptAdapter')
const HappyPack = require('./HappyPack')
// const json = require('./json')

const adapters = {
  babel,
}
const ldrs = {
  // json,
  styleloader: styles,
}

// const loaders = {
//   'babel': babel,
//   'typescript': ts,
//   'coffee': 'CoffeePlugin',
//   'html': 'HTMLPlugin',
//   'svg': 'SVGPlugin',
// }
const files = {
  'js': 'babel',
  'svg': 'svg',
  'html': 'html',
  'cs': 'coffee',
  'coffee': 'coffee',
  'ts': 'typescript',
  // tsConfig: helpers.resolve(`./tsconfig.json`),
}


class LoaderBundleConfigAdapter {
  adaptAll(settings) {
    // console.exit(settings)
    return Object.values(settings).filter(setting => {
      return !setting.settings // && !settings.name
    })
  }
}

adapters[LoaderBundleConfigAdapter] = new LoaderBundleConfigAdapter()

// if we do not have it, add it raw...?
class WebPackLoaders {
  constructor(args) {
    this.setupAdapters(args)
    // this.loaders = []
  }

  setupAdapters({context, helpers}) {
    const {builder} = context
    Object.keys(adapters).forEach(name => {
      const adapter = helpers.initClassOrObj(adapters[name])
      builder.loaders.addAdapter(name, adapter)
    })
  }
}

// test: ({app}) => app.happypack,
// @TODO: THIS SHOULD BE IN THE LOADER MODEL
// transform({context, helpers, app, box}) {
//   // console._debug('loaders_transform')
//   // console._debug(this.loaders)
//
//   const {builder} = context
//   const loaders = this.loaders // builder.loaders
//   let loadersToAdd = []
//
//   for (let i = 0; loaders.length > i; i++) {
//     const loader = loaders[i]
//     const config = loaders[loader]
//     const ldr = ldrs[loader]
//
//     // if they pass in a boolean or a config
//     if (config && ldr)
//       loadersToAdd.push(ldr({app, context, helpers, config}))
//
//     // if they pass in a custom loader
//     else if (typeof loader === 'object')
//       loadersToAdd.push(loader)
//     else if (typeof loader === 'function')
//       loadersToAdd.push(loader({context, app}))
//
//     // otherwise it is missing
//     else console.verbose(loader)
//       // context.debugFor('missingLoader', '🔎  ⚖️  loader not found', 'yellow',
//       //   {loader, loaders})
//   }
//   context.debugFor(['loaders', 'webpack'], 'TRANSFORM', 'green', loadersToAdd)
//   // console.exit(loadersToAdd)
//
//   // if we use happypack,
//   // it is the only loader,
//   // and it takes in all of our other loaders
//   //
//   // @TODO: or app.cache?
//   if (app.happypack) {
//     builder.happypack = new HappyPack({context, helpers, app})
//     return builder.happypack.loaders({
//       app, context, helpers,
//       loaders: loadersToAdd,
//     })
//   }
//
//   // otherwise use our loaders as is
//   builder.loaders = loadersToAdd
//   return this
// }

module.exports = WebPackLoaders
