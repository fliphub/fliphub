// @TODO:
// how to best use this with babel configs
// it could provide a more universal config syntax
// for plugins and loaders?
const LoaderOptions = {
  name: 'loaderOptions',
  handle({builder, context}) {
    const plugin = new builder.api.LoaderOptionsPlugin(builder.loaderOptions)
    return builder.addPlugin(plugin)
  },
}

module.exports = LoaderOptions
