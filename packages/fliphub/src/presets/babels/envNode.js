const babel = require('babel-loader-builder')

module.exports = babel({
  asObject: true,
  env: {
    targets: {
      'node': 'current',
    },
    modules: false,
    loose: true,
    debug: true,
  },
})
