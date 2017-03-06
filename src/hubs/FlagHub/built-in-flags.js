function forFlag(flag, override, context) {
  const name = Object.keys(flag)[0]
  const val = flag[name]
  const valIsReal = val != undefined
  const valNotOnContext = (context[name] == undefined)
  const valIsRealAndNotOnContext = valIsReal && valNotOnContext
  if (override || valIsRealAndNotOnContext) context[name] = val
}

function flagDefaults() {
  let flags = [{
    names: [
      {flag: 'dry'},
      {flag: 'compile'},
      {flag: 'exec'},
      {flag: 'run'},
      {flag: 'test'},
      {flag: 'fusebox'}, // , type: 'bool', default: false
      {flag: 'fuseboxa'}, // , type: 'bool', default: false
      {flag: 'cache'}, // , type: 'bool', default: false

      {flag: 'override'}, // , type: 'bool', default: false
      {flag: 'force'}, // , type: 'bool', default: false
    ],
    cb: (
      // flags
      {
        dry,
        compile, exec, run, test,
        fusebox, fuseboxa, cache,
        override, force,
      },

      // dependencies/args
      {context, app}
    ) => {
      const write = force || override
      // might have another handler that is not flags
      // do not want to override
      forFlag({fusebox}, write, app)
      forFlag({compile}, write, app)
      forFlag({exec}, write, app)
      forFlag({run}, write, app)
      forFlag({test}, write, app)
      forFlag({fuseboxAlias: fuseboxa}, override, app)

      if (dry === true) {
        app.compile = app.cache = app.exec = app.run = app.test = false
        app.dry = true
      }
      if (cache != undefined) context.settings.cache = cache

      // @TODO:
      // if (test) {
      //   if (decorated.presets) {
      //     decorated.presets.push('test')
      //     decorated.presets.push('mocha')
      //   }
      //   else decorated.presets = ['test', 'mocha']
      // }
      // helpers.log.verbose(decorated)
      // return decorated
    },
  }]

  return flags
}

module.exports = flagDefaults
