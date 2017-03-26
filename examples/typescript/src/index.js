const izz = require('izz')
const isEqual = require('lodash.isequal')

const Exception = Error

class ShouldInstance {
  constructor(obj) {
    this.obj = obj
  }

  mutate(fn) {
    this.obj = fn(this.obj)
    return this
  }

  equal(expected) {
    if (this.obj !== expected) {
      throw new Exception(`Expected ${this.obj} to equal ${expected}`)
    }
    return this
  }

  notEqual(expected) {
    if (this.obj === expected) {
      throw new Exception(`Expected ${this.obj} to not equal ${expected}`)
    }
    return this
  }

  notMatch(exp) {
    this.beString()
    if (exp.test(this.obj)) {
      throw new Exception(`Expected ${this.obj} to match ${exp}`)
    }
    return this
  }

  match(exp) {
    this.beString()
    if (!exp.test(this.obj)) {
      throw new Exception(`Expected ${this.obj} to match ${exp}`)
    }
    return this
  }

  findString(target) {
    this.beString()
    if (this.obj.indexOf(target) === -1) {
      throw new Exception(`Expected ${this.obj} to have ${target}`)
    }
    return this
  }

  notFindString(target) {
    this.beString()
    if (this.obj.indexOf(target) > -1) {
      throw new Exception(`Expected ${this.obj} not to have ${target}`)
    }
    return this
  }

  okay() {
    if (this.obj === undefined || this.obj === null) {
      throw new Exception(`Expected ${this.obj} to be not undefined or null`)
    }
    return this
  }

  haveLength(expected) {
    this.okay()
    if (this.obj.length === undefined) {
      throw new Exception(`Expected ${this.obj} to have length, got undefined`)
    }
    if (expected !== undefined) {
      if (this.obj.length !== expected) {
        throw new Exception(`Expected ${this.obj} to have length of ${expected}. Got ${this.obj.length}`)
      }
    }
    return this
  }

  /**
   * ************************************************************
   * HAVE LENGTH
   * ************************************************************
   */
  haveLengthGreater(expected) {
    this.haveLength()
    if (this.obj.length <= expected) {
      throw new Exception(`Expected ${this.obj} length be greater than ${expected}. Got ${this.obj.length}`)
    }
    return this
  }

  haveLengthGreaterEqual(expected) {
    this.haveLength()
    if (!(this.obj.length >= expected)) {
      throw new Exception(`Expected ${this.obj} length be greater or equal than ${expected}. Got ${this.obj.length}`)
    }
    return this
  }

  haveLengthLess(expected) {
    this.haveLength()
    if (!(this.obj.length < expected)) {
      throw new Exception(`Expected ${this.obj} length be less than ${expected}. Got ${this.obj.length}`)
    }
    return this
  }

  haveLengthLessEqual(expected) {
    this.haveLength()
    if (!(this.obj.length <= expected)) {
      throw new Exception(`Expected ${this.obj} length be less or equal than ${expected}. Got ${this.obj.length}`)
    }
    return this
  }

  throwException(fn) {
    try {
      fn()
      throw {__exception_test__: true}
    }
    catch (e) {
      if (e && e.__exception_test__) {
        throw new Exception('Expected exception did not occur')
      }
    }
  }

  deepEqual(expected) {
    let result = isEqual(this.obj, expected)
    if (result === false) {
      throw new Exception(`Expected the original\n${JSON.stringify(this.obj, null, 2)}\nto be deep equal to\n${JSON.stringify(expected, null, 2)}`)
    }
    return this
  }

  beTrue() {
    if (this.obj !== true) {
      throw new Exception(`Expected ${this.obj} to be true, got ${this.obj}`)
    }
    return this
  }

  beFalse() {
    if (this.obj !== false) {
      throw new Exception(`Expected ${this.obj} to be false, got ${this.obj}`)
    }
    return this
  }

  /**
   * BeChecks
   * **************************************************************************************
   */
  beString() {
    if (!izz.isString(this.obj)) {
      throw new Exception(`Expected ${this.obj} to be a string, Got ${typeof this.obj}`)
    }
    return this
  }

  beArray() {
    if (!izz.isArray(this.obj)) {
      throw new Exception(`Expected ${this.obj} to be an array, Got ${typeof this.obj}`)
    }
    return this
  }

  beObject() {
    if (!izz.isObject(this.obj)) {
      throw new Exception(`Expected ${this.obj} to be an obj, Got ${typeof this.obj}`)
    }
    return this
  }

  bePlainObject() {
    if (!izz.isPlainObject(this.obj)) {
      throw new Exception(`Expected ${this.obj} to be a plain object, Got ${typeof this.obj}`)
    }
    return this
  }

  bePromise() {
    if (!izz.isPromise(this.obj)) {
      throw new Exception(`Expected ${this.obj} to be a promise, Got ${typeof this.obj}`)
    }
    return this
  }

  beFunction() {
    if (!izz.isFunction(this.obj)) {
      throw new Exception(`Expected ${this.obj} to be a function, Got ${typeof this.obj}`)
    }
    return this
  }

  beNumber() {
    if (typeof this.obj !== 'number') {
      throw new Exception(`Expected ${this.obj} to be a number, Got ${typeof this.obj}`)
    }
    return this
  }

  beBoolean() {
    if (typeof this.obj !== 'boolean') {
      throw new Exception(`Expected ${this.obj} to be a boolean, Got ${typeof this.obj}`)
    }
    return this
  }

  beUndefined() {
    if (this.obj !== undefined) {
      throw new Exception(`Expected ${this.obj} to be a undefined, Got ${typeof this.obj}`)
    }
    return this
  }

  beMap() {
    if (this.obj instanceof Map === false) {
      throw new Exception(`Expected ${this.obj} to be instanceof Map ${typeof this.obj}`)
    }
    return this
  }

  beSet() {
    if (this.obj instanceof Set === false) {
      throw new Exception(`Expected ${this.obj} to be instanceof Map ${typeof this.obj}`)
    }
    return this
  }

  beInstanceOf(obj) {
    if (this.obj instanceof obj === false) {
      throw new Exception(`Expected ${this.obj} to be instanceof ${obj}`)
    }
    return this
  }

  beOkay() {
    if (this.obj === undefined || this.obj === null || this.obj === NaN) {
      throw new Exception(`Expected ${this.obj} to be a not undefined | null | NaN, Got ${typeof this.obj}`)
    }
    return this
  }
}

module.exports = function should(obj) {
  return new ShouldInstance(obj)
}
