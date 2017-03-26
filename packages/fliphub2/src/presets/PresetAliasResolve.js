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
  toFuseBox(config, context) {
    const entries = config.toConfig()
    const alias = entries.alias || entries.resolve.alias
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
        .split(context.get('root'))
        .pop()
        .replace('.js', '')
        .replace('.ts', '')
    })

    log
      .data(arithmetics)
      .tags('fusebox,alias,resolve,preset')
      .verbose()
      .echo()

    // config.set('alias', arithmetics)
    return {alias: arithmetics}
  }
}
