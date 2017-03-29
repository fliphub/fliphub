require('../../modules/mahna')
require('neutrino-preset-web')
const {FlipHub, log} = require('fliphub')

// console.log(global.modulesDirectories)
const apps = [
  // {
  //   name: 'basic',
  //   entry: './src/front/index.js',
  //   presets: {
  //     'flags': null,
  //     'neutrino': null,
  //     'neutrinoPresetWeb': null,
  //     'aliasResolve': null,
  //     'babel': null,
  //     // 'neutrino-preset-happypack': null,
  //     'aliasRequire': {
  //       dir: './aliases/',
  //
  //       // these are in order of least important -> most important
  //       // think of it as a chain of Object.assigns
  //       files: ['moose', 'igloo', 'react'],
  //     },
  //   },
  //
  //   resolveLoader: {modules: global.modulesDirectories},
  //   output: './dist/basic.js',
  //
  //   // builds an html file, with a <div id="root"></div>
  //   // html: '#root',
  //   // html: './src/front/index.html',
  // },
  {
    name: 'basic-bleed',
    presets: {
      'aliasResolve': null,
      'web': null,
      'aliasRequire': {
        dir: './aliases/',

        // these are in order of least important -> most important
        // think of it as a chain of Object.assigns
        files: ['moose', 'igloo', 'react'],
      },
    },

    // resolveLoader: {modules: global.modulesDirectories},
    entry: './src/front/index.js',
    output: './dist/[name].js',
  },
]

const flips = new FlipHub({
  root: __dirname,
  apps,
}).setup()

// log.quick(flips)
// log.quick(flips.toConfig())
flips.build()
