const env = require('./Env')
const plugins = [env]

const Plugins = {
  init({context}) {
    context.emit('subscribePlugins', plugins)
  },
}

module.exports = Plugins
