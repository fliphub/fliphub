const AbstractHub = require('../AbstractHub')
const loaders = require('./loaders')
// const plugins = require('./plugins')
// const pluginKeys = Object.keys(plugins)
const loaderHandlerKeys = Object.keys(loaders)
const PluginSubscriber = require('./plugins/Subscriber')

class PluginHub extends AbstractHub {
  getPlugins(args) {

  }

  getLoaders(args) {

  }

  subscribePlugins(plugins) {
    PluginSubscriber.subscribe(plugins, this.args)
  }

  appInit(args) {
    this.args = args
    const {context} = args
    const {loaders} = context.builder

    context.once('subscribePlugins', (plugins) => {
      this.subscribePlugins(plugins)
    })

    // issue is this has a config... could register on builder...
    loaderHandlerKeys.forEach(name => {
      context.emit('loaders.' + name, loaders[name])
    })
  }

  decorate() {
  }
}

module.exports = PluginHub
