function findFlags(flags, app, helpers) {
  var found = {}

  // names: [{flag: ['run'], type: 'bool', default: false}]
  for (var i = 0; i < flags.names.length; i++) {
    var flag = flags.names[i]
    var names = flag.flag

    // ['run']
    if (typeof flag !== 'object' && typeof flag === 'string') {
      found[flag] = helpers.flags.searchAll(flag)
      continue
    }

    // flag: 'run', type: 'bool', default: false
    if (typeof names === 'string') {
      found[names] = helpers.flags.searchAll(names, flag)
      continue
    }
    // flag: ['run'], type: 'bool', default: false
    if (Array.isArray(names)) {
      names.forEach(sub => found[sub] = helpers.flags.searchAll(sub, flag))
    }
  }

  // taylored for this specific environment
  // so if certain flags are added
  // there would be different properties
  var flagged = flags.cb(found)
  if (app.debug.flags) helpers.log(found, {level: '🚩  built for flags'})

  app = Object.assign(app, flagged)
  return app
}

module.exports = function(app, helpers) {
  var flags = app.flags
  if (!flags) return app

  if (!Array.isArray(flags)) flags = [flags]
  flags.forEach(flag => app = findFlags(flag, app, helpers))

  return app
}
