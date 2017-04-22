const babel = require('babel-loader-builder')

module.exports = babel({
  reactjsx: true,
  flowRuntime: false,
  stripFlow: true,
  asObject: true,
})
