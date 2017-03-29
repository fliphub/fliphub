const chai = require('chai')
// so we can use it
// once we have mutated the original
// when extending hidden
delete require.cache[require.resolve('chai')]
const chai2 = require('chai')

const assert = chai.assert
const should = chai.should
const assert2 = chai2.assert
const should2 = chai2.should

module.exports = {assert, should, assert2, should2}
