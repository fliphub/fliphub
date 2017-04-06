const isRel = require('flipfile/isRel')
const {match} = require('deep-replace')

// const isRelish = (file) => isRel('./' + file)

function resolveDeep(resolve, object, blacklist = ['not-this-file']) {
  let test = (file) =>
    (isRel(file) && !blacklist.includes(file)) // || isRelish(file)

  const decorator = ({val, obj, prop}) => {
    obj[prop] = resolve(val)
  }

  // obj, valueTest, propertyTest, decoratorFn
  match(object, test, null, decorator)

  return object
}

module.exports = resolveDeep
