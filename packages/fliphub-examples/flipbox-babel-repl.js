const config = {
  aliasDir: './aliases/',
  apps: [{
    name: 'nodes',

    // ops
    compile: true,
    exec: true,

    // can easily switch with false
    fusebox: true,

    // alias preset groups
    alias: ['moose', 'igloo'],
    presets: ['node'],
    entry: './src/back/index.js',

    // babel fun
    loaders: {
      babel: {
        config: {
          // presets: ['env'],
          presets: [['env', {
            'targets': {
              'chrome': 56,
            },
            'debug': true,
          }]],
        },
      },
    },
  }],
}
const FlipBox = require('./flipbox')
const builder = FlipBox.init(config).fullAuto()
