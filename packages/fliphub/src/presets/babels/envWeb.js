const babel = require('babel-loader-builder')

module.exports = babel({
  asObject: true,
  env: {
    targets: {
      'chrome': 52,
      'browsers': ['last 2 versions', 'safari 7'],
    },
    modules: false,
    loose: true,
    debug: true,
  },
})
