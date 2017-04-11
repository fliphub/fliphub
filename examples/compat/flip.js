const {FlipHub} = require('fliphub')

FlipHub.init({
  presets: {
    reusable: require('./webpack.config'),
  },
  apps: {
    name: 'pixi',
  },
}).build()
