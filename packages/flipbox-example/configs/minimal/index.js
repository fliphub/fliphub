const FlipBox = require('../flipbox')
const apps = [{
  name: 'ez',
  entry: './src/front/index.js',
  presets: ['react', 'babel-env'],
  html: '#root',
}]
module.exports = new FlipBox({apps}).fullAuto()
