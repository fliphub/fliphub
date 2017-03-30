class Definitions {
  constructor(args) {
    const ignore = ['utils', 'args']
    this.inspect = inspectorGadget(this, ignore)
    this.name = 'define'
    this.on = {
      'translator.done': this.done.bind(this),
      '*.define': this.handle.bind(this),
      '*.defineProduction': () => {
        this.definitions = Object.assign(this.definitions, this.presets)
      },
    }
    this.definitions = {}
    // ensure process.env.NODE_ENV === production in our src
    this.presets = {
      'NODE_ENV': 'production',
    }
  }
  handle({app, builder}) {
    const {define} = app
    this.definitions = Object.assign({}, this.definitions, define)
  }
  translate({builder}) {
  }

  done({context}) {
    if (!this.definitions) return
    const {builder} = context
    if (!Object.keys(this.definitions).length) return
    
    const settings = builder.api.EnvPlugin(this.definitions)
    const payload = {settings, name: this.name}
    // return builder.plugins.handle(payload)
    return builder.loaders.handle(payload)
  }
  defaults({builder, app}) {
  }
}

module.exports = Definitions
