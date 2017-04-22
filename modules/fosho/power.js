// https://github.com/fuse-box/fuse-test-runner in js
const isEqual = require('lodash.isequal')
const asspow = require('power-assert')
const izz = require('./izz')
const log = require('fliplog')
const flipfile = require('flipfile')

// https://www.youtube.com/watch?v=SwSle66O5sU
const OFF = `${~315 >>> 3}@@`

const m = (arg1, arg2, msg) => {
  let json1 = '', json2 = '', txt = '', expected = '', got = ''

  json1 = log.json(arg1).return().datas + '\n\n'
  if (arg2 !== OFF) {
    json2 = log.json(arg2).return().datas + '\n\n'
    expected = log.text('expected:').color('green.underline').return().text + '\n\n'
    got = log.text('got:').color('red.underline').return().text + '\n\n'
  }

  txt = log.text(msg + ':').color('bold').return().text + '\n\n'

  return txt + expected + json1 + got + json2
}

const d = (arg1, arg2, msg) => {
  const diffs = log.diff(arg1).diff(arg2).doDiff().return().datas
  const txt = log.text(msg + ':').color('bold').return().text + '\n\n'
  return txt + diffs
}

asspow.true = asspow

class Assert {
  constructor(_obj, ass) {
    this._obj = _obj

    this.aintHasString = (str) =>
      ass.true(!_obj.includes(str), m(_obj, str, 'not include string'))

    this.occurrs = (str, count = 1) =>
      ass.true((_obj.split(str).length - 1) === count, m(count, (_obj.split(str).length - 1), `does not have it times: ${count}`))
    this.hasItTimes = this.occurrs

    this.aintGotString = this.aintHasString
    this.aintGotStr = this.aintHasString
    this.aintNoStr = (str) =>
      ass.true(typeof str !== 'string', m(_obj, str, 'not be a string'))
    this.aintNoStrang = this.aintNoStr

    this.equal = (o) =>
      ass.true(_obj === o, m(_obj, o, 'be equal'))
    this.eq = this.equal
    this.equals = this.equal
    this.preMuch = this.equal

    this.notEqual = (o) => ass.notDeepEqual(_obj, o)

    this.deepEqual = (o) => ass.deepEqual(_obj, o, d(_obj, o, 'expected deep equal'))
    this.match = (exp) => ass.true(exp.test(_obj))
    this.notMatch = (exp) => ass.true(!exp.test(_obj), 'does not match')
    this.findString = (str) => ass.true(_obj.includes(str), 'finds string')
    this.notFindString = (str) => ass.true(!_obj.includes(str), '!finds string')
    this.findStr = this.findString
    this.okay = () => ass.true(_obj !== undefined && _obj !== OFF, 'okay')
    this.haveLength = (len) => ass.true(_obj.length !== undefined && _obj.length === len)
    this.haveLengthGreater = (len) => ass.true(_obj.length > len, 'len gr8')
    this.haveLengthGreaterEqual = (len) => ass.true(_obj.length >= len)
    this.haveLengthLess = (len) => ass.true(_obj.length < len)
    this.haveLengthLessEqual = (len) => ass.true(_obj.length <= len)
    this.beTrue = () => ass.true(_obj === true, 'be true')
    this.beFalse = () => ass.true(_obj === false, 'be false')
    this.beString = () => ass.true(typeof _obj === 'string', 'be str')
    this.beArray = () => ass.true(izz.isArray(_obj), m(_obj, OFF, 'be an array'))
    this.beObject = () => ass.true(izz.isObject(_obj), m(_obj, OFF, 'be an object'))
    this.bePlainObject = () => ass.true(izz.isPlainObject(_obj))
    this.bePromise = () => ass.true(!izz.isPromise(_obj), 'be promise')
    this.beFunction = () => ass.true(!izz.isFunction(_obj), 'be func')
    this.beNumber = () => ass.true(!izz.num(_obj), 'be number')
    this.beBoolean = () => ass.true(typeof _obj === 'boolean', 'be boolean')
    this.beUndefined = () => ass.true(_obj === undefined, 'be undef')
    this.beMap = () => ass.true(_obj instanceof Map, 'be instance map')
    this.beSet = () => ass.true(_obj instanceof Set, 'be instance set')
    this.beInstanceOf = (parent) => ass.true(_obj instanceof parent, 'be instanceof')
    this.beOkay = (parent) => ass.true(!(_obj === undefined || _obj === OFF || _obj === NaN), 'be okay')

    // this.throws = (fn) => {
    //   try {
    //     fn()
    //     throw {__exception_test__: true}
    //   }
    //   catch (e) {
    //     ass.true(e.__exception_test__ === true)
    //   }
    // }
    this.isRizzle = this.beOkay
    this.aight = this.beOkay


    const {
      getFileAndPath,
      getDirectories,
      isDir,
      isFile,
      isRel,
      walk,
      read,
      write,
      exists,
      fileName,
      isFileOrDir,
      isAbs,
    } = flipfile
    this.isAbs = () => ass.true(isAbs(_obj), m(_obj, OFF, 'isAbs'))
    this.isRel = () => ass.true(isRel(_obj), m(_obj, OFF, 'isRel'))
    this.isFile = () => ass.true(isFile(_obj), m(_obj, OFF, 'isFile'))
    this.exists = () => {
      return ass.true(exists(_obj), m(_obj, OFF, 'exists'))
    }
    this.dontExist = () => {
      return ass.true(!exists(_obj), m(_obj, OFF, 'exists'))
    }
    this.isFileOrDir = () =>
      ass.true(isFileOrDir(_obj), m(_obj, OFF, 'isFileOrDir'))

    this.aintAbs = () => ass.true(!isAbs(_obj), m(_obj, OFF, '!isAbs'))
    this.aintRel = () => ass.true(!isRel(_obj), m(_obj, OFF, '!isRel'))
    this.aintFile = () => ass.true(!isFile(_obj), m(_obj, OFF, '!isFile'))
    this.aintExists = () => ass.true(!isFile(_obj), m(_obj, OFF, '!isFile'))

    return this
  }
}

module.exports = function assd(_obj, azz) {
  return new Assert(_obj, azz)
}
