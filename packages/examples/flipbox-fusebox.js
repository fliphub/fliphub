const apps = [
  {
    name: 'fusebox',

    // full access to builder context if needed
    builderInstance: true,

    // writes the config to a file
    // can be used for reference by the builder so it doesn't build again
    // and so things like babel and webpack can use this
    // for aliasing and building and dev
    configOut: './dist/fuseConfig.js',

    // @TODO: multiple entry files with fusebox
    // entry: './src/back/index.js',
    entry: './src/front/index.js',
    outFile: './dist/bundled.js',

    presets: ['react'],
    loaders: ['styleloader'],
    alias: ['moose', 'igloo'],

    compile: true,
    run: true,

    // fuseboxAlias: true,
    fusebox: true,

    html: './src/front/index.html',
  },
]

const FlipBox = require('./flipbox')

const filters = ['fusebox']
const builder = new FlipBox({
  apps,
  filters,
  root: __dirname,
  aliasDir: './aliases/',
  defaultAppNames: ['fusebox'],
})

builder.fullAuto()
module.exports = builder.mediator()
