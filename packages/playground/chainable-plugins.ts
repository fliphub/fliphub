for (let [key, config] of configs) {
  console.log({key, config})
  const name = configuredNames[index]
  if (this.registered.has(name))
    plugins.push(this.registered.get(name)(config))
  else if (config)
    plugins.push(config)
}
