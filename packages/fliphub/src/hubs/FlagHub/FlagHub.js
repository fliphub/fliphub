const AbstractHub = require('../AbstractHub')
const builtIn = require('./built-in-flags')
const toArr = require('../../lib/helpers/toArr')
const {searchAll} = require('../../lib/flags')

class FlagHub extends AbstractHub {
  // test({context}) { return context.flags }

  boxInit() {
    this.boxDefaults = builtIn()
  }

  // subscribe
  // appInit({app, context, helpers, box}) {}

  defaults({app, context, helpers}) {
    // default
    context.flags = this.boxDefaults

    // merge
    if (app.flags) context.flags = context.flags.concat(toArr(app.flags))

    // same as ^
    // if (app.flags) {
    //   if (!Array.isArray(app.flags)) context.flags.push(app.flags)
    //   else context.flags = context.flags.concat(app.flags)
    // }
  }

  decorate({context, app}) {
    context.flags.forEach(flags => findFlags({flags, context, app}))
  }
}

// const cache = {}
// if (cache[flag]) found[flag] = cache[flag]
function findFlags({flags, context, app}) {
  const found = {}

  // names: [{flag: ['run'], type: 'bool', default: false}]
  for (let i = 0; i < flags.names.length; i++) {
    const flag = flags.names[i]
    const names = flag.flag

    // ['run']
    if (typeof flag !== 'object' && typeof flag === 'string') {
      found[flag] = searchAll(flag)
      continue
    }

    // flag: 'run', type: 'bool', default: false
    if (typeof names === 'string') {
      found[names] = searchAll(names, flag)
      continue
    }
    // flag: ['run'], type: 'bool', default: false
    if (Array.isArray(names)) {
      names.forEach(sub => found[sub] = searchAll(sub, flag))
    }
  }

  // taylored for this specific environment
  // so if certain flags are added
  // there would be different properties
  const flagged = flags.cb(found, {context, app})

  // @TODO: !!! when debugFor is enabled for keys
  // context.debugFor('flags', '🚩  built for flags', 'italic', {found, verbose: true})
  // context.debugFor('flags', '🚩  built for flags', 'italic')
  context.debugFor('flags', '🚩  built for flags', 'italic', found)
  return flagged
}

module.exports = FlagHub
