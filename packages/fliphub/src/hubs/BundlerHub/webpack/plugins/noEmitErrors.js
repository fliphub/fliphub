// https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
// ensures build does not halt
const NoEmitOnErrorsPlugin = {
  name: 'noEmitErrors',
  handle({builder}) {
    const plugin = new builder.api.NoEmitOnErrorsPlugin()
    return builder.addPlugin(plugin)
  },
}

module.exports = NoEmitOnErrorsPlugin
