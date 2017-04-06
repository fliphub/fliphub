const {resolve} = require('path')
const {FuseBox} = require('fuse-box')

const fuse = FuseBox.init({
  homeDir: resolve(__dirname, 'src'),
  output: resolve(__dirname, 'dist/$name.js'),
})

fuse.bundle('src')
    .watch('src/**')
    .hmr()
    .instructions(' > client/index.js')

// don't change the port (know issue with hmr)
fuse.dev({port: 4445, httpServer: false})
fuse.run()
setTimeout(() => {
  console.log('done now')
  process.exit()
}, 10000)
