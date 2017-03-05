const BuilderTranslator = {
  name: 'builder',
  // test: app => app.builder,
  translate: ({app, helpers, context}) => {
    // params to be passed down directly to the builder api
    let name = false
    let params = {}
    if (app.builder) {
      if (typeof app.builder === 'string') name = app.builder
      else {
        name = app.builder.name || false
        params = app.builder.params || app.builder
      }
    }
    if (app.fusebox || name === 'fusebox')
      context.emit('builder.fusebox', params)
    else if (app.webpack || name === 'webpack')
      context.emit('builder.webpack', params)
    else {
      console._warn('no builder specified, using webpack by default')
      context.emit('builder.webpack', params)
    }

    // context.evts.removeAllListeners('builder.webpack')
    // context.evts.removeAllListeners('builder.fusebox')
    // context.evts.removeAllListeners('builder.*')

    // if (!context.builder.name)
    //   throw new FlipValidationError('apps must have a builder')

    delete app.builder
    delete app.fusebox
    delete app.webpack
  },
}

module.exports = BuilderTranslator
