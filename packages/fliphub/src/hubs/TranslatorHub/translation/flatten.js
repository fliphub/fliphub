const FlattenTranslator = {
  name: 'flatten-params',
  test: app => app.params,
  translate: ({app, lib, context}) => {
    // flatten params onto app
    const {params} = app
    const {
      entry,
      output,
      target,
    } = params
    if (entry) app.entry = entry
    if (output) app.output = output
    if (target) app.target = target

    // so we can merge easier
    // since we are merging at the end config
    delete app.params.entry
    delete app.params.output
    delete app.params.target
    // rest of params...
  },
}

module.exports = FlattenTranslator
