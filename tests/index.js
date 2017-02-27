var {expect} = require('chai')
global.expect = expect

require('./fluent-arithmetics')
require('./builds-itself')
require('./config-and-params')
require('./dev-server')
require('./fuse')
require('./overriding-defaults')
require('./presets')
require('./require-after-build')
require('./require-after-build')

describe('test-gatherer', () => {
  describe('compiling', () => {
    it('runs the other tests', () => {
      expect(true).to.eql(true)
    })
  })
})
