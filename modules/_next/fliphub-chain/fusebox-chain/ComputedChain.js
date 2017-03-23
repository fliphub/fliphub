function computed(data) {
  const decorated = data
  const values = {}
  const keys = Object.keys(data)

  // add them all first,
  // is not perf but is clean
  keys.forEach(key => values[key] = data[key])

  // then decorate
  keys.forEach(key => {
    // if it has dependencies
    // we decorate
    var value = data[key]

    // could also decorate this so it returns if needed
    if (typeof value === 'function') {
      decorated[key] = value.bind(decorated)
    }

    // just like in a decorator
    var refToValGet = value.get
    var refToValSet = value.set
    var refToValCall = value.call
    var valueWiths = value.with || []
    var args = value.args
    var hasNoWithOrVal = false

    if (valueWiths || refToValGet || refToValSet) {
      const withs = valueWiths.map(propertyName => _get(values, propertyName))
      const definitions = {
        // enumerable: true,
        // configurable: true
      }
      if (refToValGet) {
        definitions.get = function() {
          // @NOTE: was apply `this`
          return refToValGet.apply(decorated, withs)
        }
      }
      if (refToValSet) {
        definitions.set = function() {
          // take arguments, add the withs
          const args = Object.values(arguments).concat(withs)
          const result = refToValSet.apply(decorated, args)

          // @NOTE: experiment: works, just is disabled
          // history.get(data)[key] = result
          // history[key][Date.now()] = {result, args}
          // console._exit(history)

          if (!result) return this
          return result
        }
      }
      Object.defineProperty(decorated, key, definitions)
    } else {
      hasNoWithOrVal = true
    }

    if (refToValCall) {
      //  && !decorated.call
      if (decorated.call === true) decorated.call = {}
      // could auto detect whether to pass in deps...
      // let callParams = fnParams(refToValCall)
      // let callArgs = []
      let callAppendedArgs = []
      // if (args) callArgs = args
      if (valueWiths) {
        callAppendedArgs = valueWiths.map(propertyName => _get(values, propertyName))
      }

      // callAppendedArgs.push(decorated.computed)

      if (decorated.call) {
        decorated.call[key] = function() {
          const callArgs = Object.values(arguments).concat(callAppendedArgs)
          return refToValCall.apply(this, callArgs)
        }
      }
    } else if (hasNoWithOrVal) {
      decorated[key] = value
    }
  })

  return decorated
}
