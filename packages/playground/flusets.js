const {FuseBox} = require('fsbx')

const config = {
  // homeDir: require('path').resolve(__dirname, './ts'),
  homeDir: require('path').resolve(__dirname, './src'),
  outFile: './dist/flused.js',
  cache: false,
  debug: true,
  log: true,
  project: 'flusi',
  globals: {'flusi': '*'},
}

console.log(config)
const fuse = new FuseBox(config)

// fuse.devServer('>[ts/middleout/z/entry.js]')
// fuse.devServer('>[fluse-playground.ts]')
// fuse.devServer('>[fluse-playground.ts]')
fuse.devServer('>fluse-playground.ts')

require('./dist/flused.js')

// try {
//   require('./dist/flused.js')
// } catch (e) {
//   console.log(e)
// }
