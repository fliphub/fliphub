// @TODO: if aliases are outside of the homedir, warn
const FuseBoxAlias = {
  test: app => app.fuseboxAlias,
  decorate({context}) {
    const alias = context.builder.aliases

    // go from absolute to relative
    // https://nodejs.org/api/path.html#path_path_resolve_path
    // https://webpack.github.io/docs/resolving.html
    // var arithmetic = helpers.path.relative(app.homeDir, aliasPath)
    const arithmetices = {}
    alias.keys.forEach(name => {
      const aliasPath = alias.data[name]
      arithmetices[name] = '~/'
        + aliasPath
        .split(context.homeDir)
        .pop()
        .replace('.js', '')
        .replace('.ts', '')
    })
    alias.set(arithmetices)
  },
}

module.exports = FuseBoxAlias
