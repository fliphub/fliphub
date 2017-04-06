const res = require('fliphub-resolve')
const {fosho, log} = require('fosho')
const {FlipHub} = require('./src')

const flips = new FlipHub({
  apps: [{
      // presets: {
      //   neutrinoPresetNode: null,
      // },
    flips: {
      to: 'fusebox',
    },
    name: 'building builds',
    entry: './src/index.js',
    output: './test/dist/buildSync.js',
  }],
})
const done = flips.build()
log.data(done).verbose().echo()
fosho(done).hasProps(['then'])
