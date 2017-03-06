var apps = [
  {
    name: 'basic',
    entry: './src/front/index.js',
    configOut: './configs/dist/generated/basic.js',
    loaders: ['styleloader'],
    presets: ['react'],

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

module.exports = apps
