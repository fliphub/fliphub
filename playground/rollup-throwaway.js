function withNodeResolve(arr, resolveConfig) {
  const newArray = Array.from(arr)
  // const buble = newArray.findIndex(plugin => plugin.name === 'buble')
  // newArray.splice(buble, 0, nodeResolve(resolveConfig))
  newArray.splice(0, nodeResolve(resolveConfig))
  // newArray.push(nodeResolve(resolveConfig))
  return newArray
}

let plugins = bundler.config.get('plugins')
bundler.config.plugins = plugins

// console.log(plugins)
// process.exit(0)
