const apps = [
  {
    name: 'compat',
    // webpack: './example/configs/compat/webpack.config.js',
    params: require('./webpack.config.js'),
    // env: {
    //   // develop
    // },
  },
]
const FlipBox = require('../flipbox')
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
