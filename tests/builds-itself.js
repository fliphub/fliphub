// [x] with fusebox
// [ ] with webpack
var {expect} = require('chai')

describe('flipbox', () => {
  // beforeEach(() => {
  //   process.env.argv.push('--compile')
  //   process.env.argv.push('--exec')
  //   // process.env.argv.push('--manual')
  // })
  // afterEach(() => {})

  describe('compiling', () => {
    it('exports an object', (done) => {
      // var disted = path.resolve(__dirname, '../dist/flipbox.js')
      // console.log(disted)
      // var configs = require('./example/configs/flipbox/mediator')
      // var flipbox = require(disted)
      // var flipbox = require('flipbox-dist')
      var flipbox = require('../dist/flipbox.js')
      // console.log(flipbox)
      expect(flipbox).to.be.an('object')
      expect(flipbox).to.have.property('isWebpackCli')
      expect(flipbox.flags).to.be.a('function')
      expect(flipbox.helpers).to.be.an('object')
      expect(flipbox.helpers.flags).to.be.an('object')
      // expect(flipbox.FuseBox).to.be.an('object')
      expect(flipbox.FuseBox).to.be.a('function')
      done()
    })
  })
})
