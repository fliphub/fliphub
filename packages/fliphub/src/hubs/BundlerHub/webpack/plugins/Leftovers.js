const Remaining = {
  nam: 'leftovers',
  on: '*.plugins',
  handle({app, context}) {
    const {plugins} = app
    const {builder} = context
    for (let i = 0; i < plugins.length; i++) {
      const settings = plugins[i]
      const name = settings.name || i
      const payload = {name, settings}
      builder.plugins.handle(payload)
    }
  },
}

module.exports = Remaining
