// do release script example here
const config = {
  aliasDir: './aliases/',
  apps: [{
    name: ['nodes', 'another-npm-package-name'],

    // ops
    // compile: true,
    // exec: true,

    // can easily switch with false
    // fusebox: true,

    // alias preset groups
    alias: ['moose', 'igloo'],
    presets: ['node'],
    entry: './src/back/index.js',
  }],
}
const FlipBox = require('./flipbox')
const builder = FlipBox.init(config).fullAuto()

module.exports = builder.mediator()
