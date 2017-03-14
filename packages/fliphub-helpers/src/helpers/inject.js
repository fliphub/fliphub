function injectPlugins(config, plugins, position) {
  // @TODO
  // if (position)

  if (Array.isArray(plugins))
    config.webpack.plugins = config.webpack.plugins.concat(plugins)
  else
    config.webpack.plugins.push(plugins)

  return config
}

function injectLoaders(config, loaders, position) {
  // @TODO
  // if (position)

  if (Array.isArray(loaders))
    config.webpack.module.loaders = config.webpack.module.loaders.concat(loaders)
  else
    config.webpack.module.loaders.push(loaders)

  return config
}


module.exports = {
  injectPlugins,
  injectLoaders,
}
