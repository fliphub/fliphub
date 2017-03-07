const WebPackConfig = {
  parse(args) {
    const {context, builder, api, app} = args
    let {config} = builder
    const {sourcemaps, target, params} = builder
    const {bundles} = context
    const bundle = bundles.getBundle()
    const {pm} = bundle

    if (!config.entry) config.entry = bundle.entry() || bundles.asFull().in
    config.outFile = bundle.outFile()
    return config
  },
}

module.exports = WebPackConfig
