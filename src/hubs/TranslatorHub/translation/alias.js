const contextAlias = {
  alias: {},
  resolved: {},
  keys: [],
}

// @TODO: should be class with computed props akin to sourcemaps
const AliasTranslator = {
  name: 'alias',
  test: app => app.alias || app._alias,
  init: ({context}) => context.alias = contextAlias,
  translate: ({app, helpers, context, emit}) => {
    // @example:
    // alias: {'hullabaloo': './src/backend/index.js'},
    // if (!Array.isArray(app.alias) && app.alias && typeof app.alias === 'object') {
    //   app._alias = app.alias
    //   delete app.alias
    // }

    let aliases = null
    if (app.alias)
      aliases = helpers.aliaser.requireAndHandle(app.alias)
    if (app._alias)
      aliases = Object.assign(
        context.alias,
        helpers.aliaser.fromObj(app._aliases)
      )

    if (aliases) context.builder.aliases.set(aliases)

    context.emit('translated.alias')
  },
}

module.exports = AliasTranslator
