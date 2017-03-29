const resolve = require('fliphub-resolve')
const log = require('fliplog')

module.exports = class PresetRequireAlias {
  constructor() {
    this.args = []
  }

  toWebpack(config) {
    const {alias} = config
    if (!alias) return null
    return resolve.obj(alias)
  }

  // @TODO: if aliases are outside of the homedir, warn
  toFuseBox(config, workflow) {
    const entries = config.toConfig()
    const root = workflow.current.config.get('root')
    // log.quick(config)

    let alias
    if (entries) alias = entries.alias
    if (!alias && entries && entries.resolve) alias = entries.resolve.alias
    if (!alias) return null

    // go from absolute to relative
    // https://nodejs.org/api/path.html#path_path_resolve_path
    // https://webpack.github.io/docs/resolving.html
    // var arithmetic = helpers.path.relative(app.homeDir, aliasPath)
    const arithmetics = {}
    Object.keys(alias).forEach((name) => {
      const aliasPath = alias[name]
      arithmetics[name] = '~/' +
        aliasPath
        .split(root)
        .pop()
        .replace('.js', '')
        .replace('.ts', '')

      // why won't this work ^ ?
      arithmetics[name] = arithmetics[name].replace('//', '/')
    })

    log
      .data(arithmetics)
      .tags('fusebox,alias,resolve,preset,bundler')
      .verbose()
      .echo()

    // config.set('alias', arithmetics)
    return {alias: arithmetics}
  }
}
