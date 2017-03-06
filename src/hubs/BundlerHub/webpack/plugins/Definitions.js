function noop() {}
class Definitions {
  constructor(args) {
    const ignore = ['toArr', 'utils', 'context', 'helpers', 'args']
    this.inspect = inspectorGadget(this, ignore)
    this.args = args
    this.name = 'define'
    this.on = {
      'translator.done': this.done.bind(this),
      '*.define': this.handle.bind(this),
      '*.defineProduction': () => {
        this.definitions = Object.assign(this.definitions, this.presets)
      },
    }
    this.definitions = {
      '_noop': noop,
    }
    this.presets = {
      'process.env.NODE_ENV': JSON.stringify('production'),
    }
  }
  handle({app, builder}) {
    const {define} = app
    this.definitions = Object.assign({}, this.definitions, define)
  }
  translate({builder}) {
  }

  done({context}) {
    const {builder} = context
    // ensure node_env === production in our src
    const settings = new builder.api.DefinePlugin(this.definitions)
    const payload = {settings, name: this.name}
    return builder.plugins.handle(payload)
  }
  defaults({builder, app}) {
  }
}

module.exports = Definitions
