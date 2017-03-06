// @TODO:
// - [ ] extract this into more reusable for clients adding handlers
// - [ ] add `initClassOrObj`
class Plugin {
  constructor(plugin, args) {
    const {context, helpers} = args
    const ignore = ['toArr', 'utils', 'context', 'helpers', 'args']
    this.inspect = inspectorGadget(this, ignore)
    this.context = context
    this.helpers = helpers
    this.args = args
    this.toArr = helpers.toArr
    this.utils = helpers.utils
    this.register(plugin)
  }
  subscribe(plugin, event) {
    const {toArr, context, utils} = this
    const pluginEvt = plugin[event]

    if (utils.isPlainObject(pluginEvt)) {
      Object.keys(pluginEvt).forEach(evt => {
        const handle = pluginEvt[evt]

        context.debugFor('subscribePlugin', '👂  subscribing keys ' + plugin.name + ' to ' + evt, 'orange')
        context[event](evt, handle)
      })
    } else {
      toArr(pluginEvt).forEach(evt => {
        context.debugFor('subscribePlugin', '👂  subscribing ' + plugin.name + ' to ' + evt, 'orange')
        context[event](evt, plugin.handle)
      })
    }
  }
  register(plugin) {
    plugin = this.helpers.initClassOrObj(plugin, this.args)
    if (plugin.on) this.subscribe(plugin, 'on')
    if (plugin.once) this.subscribe(plugin, 'once')
    // if (plugin.done)
  }
}

const PluginSubscriber = {
  subscribe(plugins, args) {
    const Plugins = []
    plugins.forEach(plugin => Plugins.push(new Plugin(plugin, args)))
    return Plugins
  },
}

module.exports = PluginSubscriber
