const apps = require('./apps')
const FlipBox = require('../../../src')

const flip = new FlipBox({
  apps,
  // aliasDir: './example/configs/aliases/',
})

const built = flip.build()
const mediator = flip.mediator()
console.log('\n'.repeat(10))
console.log(mediator)
console.log('\n'.repeat(10))

// const mediator = require('./webpack.config')
module.exports = mediator
