// https://www.bennadel.com/blog/2829-string-interpolation-using-util-format-and-util-inspect-in-node-js.htm
const filter = [
  'helpers',
  // 'flags',
  'addDebug',
  'inspect',
  'emit',
  'on',
  'debugFor',
  'translator',
  'appsByName',

  // these ones we might want to toggle on and off
  'instance',
  'api',
  'evts', //
  'hubs',
]
global.inspectorGadget = (thisArg, moreFilters) => {
  return function(depth, options) {
    let toInspect = Object.keys(thisArg)
    .filter(key => !filter.includes(key))

    if (Array.isArray(moreFilters))
      toInspect = toInspect.filter(key => !moreFilters.includes(key))
    else if (typeof moreFilters === 'function')
      toInspect = toInspect.map(key => moreFilters(key, this[key]))
    else if (typeof moreFilters === 'object') {
      // if (moreFilters.blacklist)
      if (moreFilters.whitelist) {
        toInspect = toInspect.filter(key => moreFilters.whitelist.includes(key))
      }
      // if (moreFilters.val) {
      //   return moreFilters.val
      // }
      // if (moreFilters.filter)
      // if (moreFilters.map)
    }

    let inspectorGadget = {}
    toInspect.forEach(key => {
      // @TODO: filter out .length on function...
      // let val = thisArg[key]
      // if (typeof val === 'function')
      inspectorGadget[key] = thisArg[key]
    })
    return inspectorGadget
    // console.log(inspectorGadget)

    // return this
    // return util.inspect(this, {
    //   showHidden: true,
    //   depth: null,
    //   showProxy: true,
    //   maxArrayLength: null,
    //   colors: true,
    //   // customInspect: false,
    //   // colors: {}
    // })
  }
}
// message.inspect = message.inspect.bind(message)
