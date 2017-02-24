import {expect} from 'chai'
import '../src/back'

describe('backend', () => {
  it('is defined', () => {
    expect(global.moose).to.be.a('function')
  })
})
