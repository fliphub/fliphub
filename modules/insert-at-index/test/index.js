const insertAt = require('../')

const list = [0, 1, 2, 3, 4]
const eh = ['canada', 'moose']

const inserted = insertAt(list, 2, eh)
const expected = [0, 1, 'canada', 'moose', 3, 4]

expected.forEach((expect, i) => {
  console.assert(expect === inserted[i], 'same at the same index')
})
console.log('all assertions passed :-)')
