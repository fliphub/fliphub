var _defaultsDeep = require('lodash.defaultsdeep')

// @TODO:
// defaults on env
module.exports = function(app, helpers) {
  var env = app.env
  if (!env) return app

  var node_env = helpers.flags.get('node_env') || process.env.NODE_ENV
  var is_build = process.env.npm_lifecycle_event
  helpers.log.text(`env: ${node_env}`)

  var result = {}
  if (node_env === 'production') {
    var result = env.production
    if (result.merge) return _defaultsDeep(app, result)
    app = Object.assign(app, result)
  }

  else if (node_env === 'development') {
    var result = env.development
    if (result.merge) return _defaultsDeep(app, result)
    app = Object.assign(app, result)
  }

  else if (node_env === 'testing') {
    var result = env.testing
    if (result.merge) return _defaultsDeep(app, result)
    app = Object.assign(app, result)
  }

  else if (env[node_env]) {
    if (env[node_env].merge) return _defaultsDeep(app, env[node_env])
    app = Object.assign(app, env[node_env])
  }

  // @TODO: middleware in builder likely should be doing this eh...
  Object.keys(result).forEach(key => {
    app = helpers.builder.appBuilder.pipe(app, key)
  })

  return app
}
