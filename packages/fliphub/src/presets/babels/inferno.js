const babel = require('babel-loader-builder')

module.exports = babel({
  reactjsx: false,
  flowRuntime: false,
  stripFlow: true,
  asObject: true,
  inferno: {
    imports: true,
    // compat: true,
  },
})
