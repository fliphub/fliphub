const fsbx = require('fsbx')
const fuse = new fsbx.FuseBox({
  homeDir: require('path').resolve(__dirname, './'),
  outFile: './dist/fluse.js',
  cache: false,
  debug: true,
  log: true,
  globals: {default: '*'},
  plugins: [
    fsbx.BabelPlugin({
      config: {
        sourceMaps: true,
        'presets': ['latest'],
      },
    }),
  ],
})

fuse.devServer('>[middleout/z/entry.js]')

// require('../dist/fluse.js')

setInterval(() => {
  try {
    var eh = require('../dist/fluse.js')
    console.log('______________')
    console.log(eh)
  } catch (e) {
    console.log(e)
  }
}, 5000)
