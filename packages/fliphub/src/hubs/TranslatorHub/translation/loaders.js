// uglify, ts, babel
// const flatLoaders = []
const LoadersTranslator = {
  name: 'loaders',
  // test: app => app.builder,
  translate: ({app, helpers, context}) => {
    // if the app has configured loaders
    let {loaders} = app
    if (!loaders) loaders = []

    // @TODO:
    // later to flatten,
    // needs to be abstracted
    // if (app.babel) loaders.push({
    //   name: 'babel',
    //   settings: app.babel,
    // })

    if (loaders) {
      let _loaders = {}
      if (Array.isArray(loaders)) loaders.forEach(loader => _loaders[loader] = {})
      else _loaders = loaders

      // if (app.uglify) _loaders.uglify = app.uglify
      // if (app.define) _loaders.define = app.define
      // if (app.provide) _loaders.provide = app.provide

      const keys = Object.keys(_loaders)
      for (let i = 0; keys.length > i; i++) {
        const loader = keys[i]
        const config = _loaders[loader]

        // nice thing is,
        // when only subscribed with `once`
        // the next ones will not trigger
        context.emit('translate.loader.' + loader, loader, config)
      }
    }

    // get loaders based on the files
    // @example: ['ts', 'js']
    const fileTypes = context.bundles.fileTypes()
    for (let i = 0; fileTypes.length > i; i++) {
      const fileType = fileTypes[i]
      if (!fileType) continue
      // @example: loader.ts
      context.emit('translate.loader:file.' + fileType, fileType)
    }

    // @TODO:
    // context.removeListeners('loader.*')
    // context.removeListeners('loader:file.*')
    context.emit('loadersDone')
  },
}

module.exports = LoadersTranslator





// @example:
// ['styleloader'] -> {styleloader: {}}

// @TODO: have helper like `.isApp`
// then it is not an app, is a preset or other
//
// @example:
// presets: {
//   inferno: {
//     loaders: ['styleloader']
//   }
// }
// if (!app.params && !app.config && !app.entry) {
//   Object.keys(app).forEach(prop => {
//     var loaders = {}
//     var propLoaders = app[prop].loaders
//     if (Array.isArray(propLoaders)) {
//       propLoaders.forEach(loader => loaders[loader] = {})
//       app[prop].loaders = loaders
//     }
//   })
// }
