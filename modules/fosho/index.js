const log = require('fliplog')
const power = require('power-assert')
const extend = require('lodash.assigninwith')
const exposeHidden = require('expose-hidden')
const {assert, should, assert2, should2} = require('./chai')
const {lcFirst, ucFirst} = require('./helpers')
const powers = require('./power')
const izz = require('./izz')

// https://github.com/avajs/ava/blob/2a206311d708361b294a21aa4c5bd199936d0824/lib/enhance-assert.js
let Fosho = {}
let debugMode = false
let logMode = false

// compatibility
power.true = power

// log if good to go
function gtg(key, args) {
  if (!logMode) return
  log
    .color('green')
    .text(key + '? fosho')
    .echo()
}

// scope it so it doesn't need to be passed in every time
let scoped = null

// https://github.com/avajs/ava#assertions
const foshizzle = (arg, t) => {
  if (!t && scoped) t = scoped
  if (!t) t = power
  // if (t && !scoped) {
  //   scoped = t
  // }
  // else if (t && scoped && scoped._test && t._test && scoped._test.title != t._test.title) {
  //   scoped = t
  // }
  // else if (!t && scoped) {
  //   t = scoped
  // }
  // else if (!t) {
  //   t = power
  // }

  Fosho = {}

  const shoulds = should(arg)

  // take hidden properties, expose them
  exposeHidden(shoulds)
  exposeHidden(assert)

  // extend power-assert
  // extend(Fosho, t, (v, fn, key, o, src) => (fnArg) => {
  //   t(arg, fnArg)
  //   return Fosho
  // })

  // does not return true just throws
  extend(Fosho, assert, (v, fn, key, o, src) => {
    o[key] = (fnArg, msg) => {
      // log.data({key, arg, fnArg, assertion: assert[key](arg, fnArg, msg)}).echo()
      t.true(assert[key](arg, fnArg, msg)  !== false)

      gtg(key)
      return Fosho
    }
    return o[key]
  })

  // objValue, srcValue, key, object, source
  // does not return true just throws
  extend(Fosho, shoulds, (v, fn, key, o, src) => {
    o[key] = (fnArg) => {
      t.true(should2(arg)[key](fnArg) !== false)
      gtg(key)
      return Fosho
    }
    return o[key]
  })

  extend(Fosho, izz, (v, fn, key, o, src) => {
    // log.color('bold').text(key).echo()
    o[key] = (fnArg) => {
      const assertion = izz[key](arg, fnArg)
      if (assertion) {
        // if we decorate with `not`, or `is*` or `uppercaseFirst`
        // then we want to not assert twice
        if (o[key].aint !== true) {
          gtg(key)
          t.true(izz[key](arg, fnArg) !== false)
          return Fosho
        }

        return Fosho
      }
      else {
        t.true(izz[key](arg, fnArg) !== false)

        if (debugMode) {
          const msg = 'was not fosho ' + key
          const validation = new Error(msg)
          validation.youUsed = arg

          log
            .trace()
            .verbose(2)
            .data(validation)
            .preset('error')
            .echo()

          throw validation
        }
      }
      return Fosho
    }
    return o[key]
  })

  const ass = powers(arg, t)
  extend(Fosho, ass, (v, fn, key, o, src) => (fnArg, fnArg2) => {
    ass[key](fnArg, fnArg2)
    // else log.quick({v, fn, key, o, src})
    // else if (o[key])
    return Fosho
  })

  Object.keys(Fosho).forEach((key) => {
    if (key.includes('is')) {
      const shortKey = lcFirst(key.replace('is', ''))
      if (Fosho[shortKey]) return
      Fosho[shortKey] = Fosho[key]
    }
    if (key.includes('is')) {
      const keyBe = key.replace('is', 'be')
      if (Fosho[keyBe]) return
      Fosho[keyBe] = Fosho[key]
    }
  })

  return Fosho
}

// if previous assertions have passed,
// this will be true,
// otherwise they will return false
Fosho.izzle = () => true

// as static methods, simply wrap the fn call
Object.keys(izz).forEach((key) => {
  foshizzle[key] = (arg, fnArg) => foshizzle(arg)[key](fnArg)
})

foshizzle.logMode = (bool) => logMode = bool
foshizzle.debugMode = (bool) => debugMode = bool
foshizzle.is = izz
foshizzle.assert = assert2
foshizzle.should = should2
foshizzle.fosho = foshizzle
foshizzle.log = log
foshizzle.t = (t) => scoped = t

module.exports = foshizzle
