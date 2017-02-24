require('./builds-itself')
require('./config-and-params')
require('./dev-server')
require('./fuse')
require('./overriding-defaults')
require('./presets')
require('./require-after-build')
import {expect} from 'chai'

describe('flipbox', () => {
  // beforeEach(() => {
  //   process.env.argv.push('--compile')
  //   process.env.argv.push('--exec')
  //   // process.env.argv.push('--manual')
  // })
  // afterEach(() => {})

  describe('compiling', () => {
    it('exports an object', (done) => {
      var configs = require('./example/configs/flipbox/mediator')
      console.log(configs)
      expect(configs).to.be.an('object')
      done()
    })
  })
})
