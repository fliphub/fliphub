const apps = [
  {
    name: 'basic',
    entry: './src/front/index.js',

    // writes the generated config to a file
    configOut: './build/generated/basic.js',
    // loaders: ['styleloader', {'babel': true}],
    loaders: {
      'styleloader': true,
      'babel': {},
    },
    presets: ['inferno', 'babel-env'],
    // these are in order of least important -> most important
    // think of it like a chain of Object.assigns
    alias: ['moose', 'igloo', 'inferno'],
    // outFile: './dist/basic.js',

    // runs the dev server
    run: true,

    // makes it `build`
    // compile: true,

    // makes it build, and then execute/require&call
    // the built file, with jsdom polyfilling!
    // exec: true,

    // resolves and loads this html file and adds to the plugins
    html: './src/front/index.html',
  },
]

const FlipBox = require('./flipbox')
const builder = new FlipBox({
  apps,
  root: global._dirname,
  aliasDir: './aliases/',
  defaultAppNames: ['basic'],
})

builder.fullAuto()
// module.exports = builder.mediator()
