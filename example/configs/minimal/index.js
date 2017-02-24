var FlipBox = require('flip-box')
var apps = [{
  name: 'ez',
  entry: './src/front/index.js',
  presets: ['react'],
  html: '#root',
}]
module.exports = new FlipBox({apps}).fullAuto()
