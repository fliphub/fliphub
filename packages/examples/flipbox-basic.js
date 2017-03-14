const apps = [
  {
    name: 'basic',
    entry: './src/front/index.js',
    configOut: './configs/dist/generated/basic.js',
    loaders: ['styleloader'],
    presets: ['react', 'babel-env'],

    // happypack: false,

    // these are in order of least important -> most important
    // think of it like a chain of Object.assigns
    alias: ['moose', 'igloo', 'react'],
    outFile: './dist/basic.js',
    // can turn this on or off to use fusebox,
    // if it is compatible with what you need!
    fusebox: true,

    // runs the dev server
    run: true,

    // builds an html file, with a <div id="root"></div>
    // html: '#root',
    html: './src/front/index.html',
  },
]

const FlipBox = require('./flipbox')
const builder = new FlipBox({
  apps,
  root: __dirname,
  aliasDir: './aliases/',
  defaultAppNames: ['basic'],
})

builder.fullAuto()
module.exports = builder.mediator()
