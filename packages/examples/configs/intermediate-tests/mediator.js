const apps = [
  {
    name: 'basic-tests-mocha',
    presets: ['react', 'test', 'mocha'],
    entry: './tests/backend.js',
  },
  {
    name: 'basic-tests-karma',
    presets: ['react', 'test', 'karma'],
    entry: './tests/frontend.js',
  },
]
const FlipBox = require('../flipbox')
const builder = new FlipBox({
  apps,
  root: global._dirname,
  aliasDir: './configs/aliases/',
  debug: {
    verbose: true,
    filter: true,
  },
})

builder.build()

builder.compile().then(() => {
  builder.auto()
})

module.exports = builder.mediator()
