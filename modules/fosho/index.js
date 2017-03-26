const log = require('fliplog')
const izz = require('./izz')
const lcFirst = (string) => string.charAt(0).toLowerCase() + string.slice(1)

const chai = require('chai')
const extend = require('lodash.assigninwith')

const assert = chai.assert
const should = chai.should

delete require.cache[require.resolve('chai')]
const chai2 = require('chai')
const assert2 = chai2.assert
const should2 = chai2.should

const fuse = require('./fuse')

let Fosho = {}
let debugMode = false
let logMode = false

function assignMissing(obj, thisArg) {
  if (!thisArg) thisArg = obj
  const keys = Object.keys(obj)
  Object
    .getOwnPropertyNames(
      Object
        .getPrototypeOf(obj))
        .filter((key) => typeof obj[key] === 'function')
        .forEach((key) => {
          if (!keys.includes(key)) {
            if (typeof obj[key].bind === 'function') {
              obj[key] = obj[key].bind(thisArg)
            } else {
              obj[key] = obj[key]
            }
          }
        })
}

// log if good to go
function gtg(key, args) {
  if (!logMode) return
  log
    .color('green')
    .text(key + '? fosho')
    .echo()
}

const foshizzle = (arg, t = false) => {
  Fosho = {}

  const fused = fuse(arg)
  const shoulds = should(arg)

  // take hidden properties, expose them
  assignMissing(fused)
  assignMissing(shoulds)
  assignMissing(assert)

  // objValue, srcValue, key, object, source
  extend(Fosho, fused, (o, fn, key) => (fnArg) => {
    const assertion = !!fn(fnArg)
    if (t) t.true(assertion)
    return Fosho
  })

  // does not return true just throws
  extend(Fosho, shoulds, (v, fn, key, o) => {
    o[key] = (fnArg) => {
      const assertion = should2(arg)[key](fnArg)
      gtg(key)
      if (t) t.true(assertion)
      return Fosho
    }
    return o[key]
  })
  // does not return true just throws
  extend(Fosho, assert, (v, fn, key, o) => {
    o[key] = (fnArg, msg) => {
      const assertion = assert2[key](arg, fnArg, msg)
      gtg(key)
      if (t) t.true(true)
      return Fosho
    }
    return o[key]
  })
  extend(Fosho, fused, (v, fn, key, o) => {
    o[key] = (fnArg) => {
      const assertion = fn(fnArg)
      if (assertion) {
        // if we decorate with `not`, or `is*`
        // then we want to not assert twice
        if (o[key].aint !== true) {
          gtg(key)
          if (t) t.true(true)

          return Fosho
        }
      }
      else {
        console.log('should throw, fused', key)
      }
      return Fosho
    }
    return o[key]
  })

  extend(Fosho, izz, (v, func, key, o) => {
    o[key] = (fnArg) => {
      const assertion = izz[key](arg, fnArg)
      if (assertion) {
        // if we decorate with `not`, or `is*` or `uppercaseFirst`
        // then we want to not assert twice
        if (o[key].aint !== true) {
          gtg(key)
          if (t) t.true(assertion)
          return Fosho
        }

        return Fosho
      }
      else {
        const msg = 'was not fosho ' + key
        const validation = new Error(msg)
        validation.youUsed = arg
        if (t) t.true(assertion)

        if (debugMode) {
          log
            .trace()
            .verbose(2)
            .data(validation)
            .preset('error')
            .echo()
        }
        throw validation
      }
      return Fosho
    }
    return o[key]
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

module.exports = foshizzle
