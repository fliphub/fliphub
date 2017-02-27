const contextAlias = {
  alias: {},
  resolved: {},
  keys: [],
}

const AliasTranslator = {
  test: app => app.alias || !app._alias,
  init: cnxt => cnxt.alias = contextAlias,
  translate: ({app, lib, context}) => {
    if (app.alias)
      context.alias = lib.aliaser.requireAndHandle(app.alias)
    if (app._alias)
      context.alias = Object.assign(
        context.alias,
        lib.aliaser.fromObj(app._aliases)
      )

    context.alias.keys = Object.keys(context.alias)
    lib.debugFor(
      'alias', '⛓  🏹  aliasing', 'blue',
      {alias: app.alias, _alias: app._alias})
  },
}

module.exports = AliasTranslator
