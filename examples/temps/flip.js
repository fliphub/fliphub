require('../../modules/mahna')

require('webpack')
require('neutrino-preset-web')
// console.log(global.modulesDirectories)
const apps = [
  {
    name: 'basic',
    entry: './src/front/index.js',
    presets: {
      'flags': null,
      'neutrino': null,
      'neutrino-preset-web': null,
      'alias-resolve': null,
      'defaults-env': null,
      'babel': null,
      // 'neutrino-preset-happypack': null,
      'alias-require': {
        dir: './aliases/',

        // these are in order of least important -> most important
        // think of it as a chain of Object.assigns
        files: ['moose', 'igloo', 'react'],
      },
    },

    resolveLoader: {modules: global.modulesDirectories},
    output: './dist/basic.js',

    // builds an html file, with a <div id="root"></div>
    // html: '#root',
    // html: './src/front/index.html',
  },
  {
    name: 'basic-bleed',
    entry: './src/front/index.js',
    presets: {
      'neutrino': null,
      'neutrino-preset-web': null,
      'alias-resolve': null,
      'defaults-env': null,
      'babel': null,
      'neutrino-preset-happypack': null,
      'alias-require': {
        dir: './aliases/',

        // these are in order of least important -> most important
        // think of it as a chain of Object.assigns
        files: ['moose', 'igloo', 'react'],
      },
    },

    resolveLoader: {modules: global.modulesDirectories},
    output: './dist/basic.js',
  },
]

const FlipHub = require('fliphub2')
const flips = new FlipHub({
  root: __dirname,
  apps,
})

const log = require('fliplog')
flips.setup()
const config = flips.toConfig()
// log.data(config).verbose().echo()
flips.ops.build()
