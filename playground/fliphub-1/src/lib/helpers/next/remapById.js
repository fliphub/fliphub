type ObjectWithId = {
  id: uuid | mixed,
}
type Remappable = Object<ObjectWithId> | Array<ObjectWithId>
type RemappedObject = Object<ObjectWithId.id, value>

/**
 * @example
 * in: [
 *  {id: 'eh', val: 'canada'},
 *  {id: 'moose', val: 'igloo'}
 * ]
 *
 * out: {
 *  'eh': {id: 'eh', val: 'canada'},
 *  'moose': {id: 'moose', val: 'igloo'}
 * }
 */
export default function remapById(values: Remappable): RemappedObject {
  // @TODO: should reload if there is no remap by id vals...
  if (!values || typeof values !== 'object') return {}

  var asObj = Object.values(values)
  var remappedValues = {}

  // remap to add item id as object property
  var keys = Object.keys(asObj)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    var val = asObj[key]

    remappedValues[val.id] = val
  }
  // console.debug('remapById', {values, asObj})

  return remappedValues
}
