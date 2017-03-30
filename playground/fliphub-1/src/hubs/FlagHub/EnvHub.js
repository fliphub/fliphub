// const _defaultsDeep = require('lodash.defaultsdeep')
const AbstractHub = require('../AbstractHub')
const builtIn = require('./built-in-env')

class EnvHub extends AbstractHub {
  boxInit() {
    this.boxDefaults = builtIn()
  }

  defaults({app, context, helpers}) {
    // default
    let env = this.boxDefaults

    // merge
    if (app.env) env = Object.assign(env, app.env)

    // setup for decoration
    context.env = env

    // should be done in decorate,
    // but defaults in ops needs this?
  }

  // test: app => app.env,
  decorate({app, context, helpers}) {
    const env = context.env
    const node_env = process.env.NODE_ENV || helpers.flags.get('node_env') || 'magic'
    const is_build = process.env.npm_lifecycle_event
    const config = env[node_env]
    context.debugFor('env', `env: ${node_env} ${config}`)

    // if (env[node_env].merge) return _defaultsDeep(app, config)
    context = Object.assign(context, config)
    app = Object.assign(app, config)
  }
}

module.exports = EnvHub
