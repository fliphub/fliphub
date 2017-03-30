const isRel = require('../file/isRel')
const {deepReplaceTest} = require('../deepReplace')
// const {resolve} = require('./resolve')

module.exports = function resolveDeep(resolve, obj, blacklist = ['not-this-file']) {
  const test = file => isRel(file) && !blacklist.includes(file)
  const decorator = ({val, obj, prop}) => obj[prop] = resolve(val)

  // obj, valueTest, propertyTest, decoratorFn
  deepReplaceTest(obj, test, null, decorator)

  return obj
}
