const {FuseBox, HTMLPlugin} = require('fsbx')

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  debug: true,
  log: true,
  // cache: false,
})
const entry = 'index.js'
fuse.bundle('fusable')
  .sourceMaps(true)
  // .watch('server/**') // watch only server related code.. bugs up atm
  .instructions(`> [${entry}]`)
  // .instructions(`*.js`)
  // Execute process right after bundling is completed
  // launch and restart express
  .completed(proc => proc.start())

fuse.run()
