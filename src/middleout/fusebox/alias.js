// @TODO: if aliases are outside of the homedir, warn
const FuseBoxAlias = {
  test: app => app.fuseboxAlias,
  decorate({context}) {
    // go from absolute to relative
    // https://nodejs.org/api/path.html#path_path_resolve_path
    // https://webpack.github.io/docs/resolving.html
    // var arithmetic = helpers.path.relative(app.homeDir, aliasPath)
    const arithmetices = {}
    context.alias.keys.forEach(name => {
      const aliasPath = context.aliases[name]
      arithmetices[name] = '~/' + aliasPath
        .split(context.homeDir)
        .pop()
        .replace('.js', '')
        .replace('.ts', '')
    })
  },
}

module.exports = FuseBoxAlias
