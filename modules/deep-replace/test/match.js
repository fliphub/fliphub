const test = require('ava')
const {fosho, log} = require('fosho')
const {match} = require('../')

test('match', t => {
  const fixture = {
    value: 'string',
    nested: {
      again: {
        again: 'string',
        object: {},
        array: [],
      },
    },
  }

  const valueTest = (value) => {
    // console.log(typeof value === 'string')
    return typeof value === 'string'
  }
  const propertyTest = null
  const decorator = ({val, obj, prop}) => {
    obj[prop] = val + '+'
    // console.log({val, obj, prop})
  }

  match(fixture, valueTest, propertyTest, decorator)
  
  t.true(fixture.nested.again.again === 'string+')
  t.true(fixture.value === 'string+')
})
